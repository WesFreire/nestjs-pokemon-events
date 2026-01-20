import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  constructor(private readonly httpService: HttpService) {}

  async buildPokemonTypeReport(type: string) {
    const pokemonNames = await this.getPokemonByType(type);
    const detailedPokemons = await this.getPokemonsDetails(pokemonNames);

    const averageWeight =
      detailedPokemons.reduce((sum, p) => sum + p.weight, 0) /
      detailedPokemons.length;

    const heaviestPokemon = detailedPokemons.reduce((prev, current) =>
      current.weight > prev.weight ? current : prev,
    ).name;

    return {
      search_info: {
        type,
        processed_at: new Date(),
      },
      summary: {
        total_found: detailedPokemons.length,
        average_weight: Number(averageWeight.toFixed(2)),
        heaviest_pokemon: heaviestPokemon,
      },
      results: detailedPokemons.map(({ weight, ...rest }) => rest),
    };
  }

  async getPokemonByType(type: string): Promise<string[]> {
    const response = await firstValueFrom(
      this.httpService.get(`https://pokeapi.co/api/v2/type/${type}`),
    );

    return response.data.pokemon.map((item) => item.pokemon.name);
  }

  async getSinglePokemonDetails(name: string) {
    const response = await firstValueFrom(
      this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
    );

    const data = response.data;

    const powerLevel = data.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0,
    );

    return {
      id: data.id.toString(),
      name: data.name,
      weight: data.weight,
      abilities: data.abilities.map((a) => a.ability.name),
      power_level: powerLevel,
      tier: powerLevel > 50 ? 'Elite' : 'Common',
    };
  }

  async getPokemonsDetails(names: string[]) {
    return Promise.all(names.map((name) => this.getSinglePokemonDetails(name)));
  }
}
