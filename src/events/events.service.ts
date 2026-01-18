import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  constructor(private readonly httpService: HttpService) {}

  // async listEvents() {
  //   const response = await firstValueFrom(
  //     this.httpService.get('https://pokeapi.co/api/v2/pokemon/pikachu'),
  //   );

  //   const pokemon = response.data;

  //   return [
  //     {
  //       title: 'Electric Event',
  //       pokemonName: pokemon.name,
  //       pokemonID: pokemon.id,
  //       type: pokemon.types[0].type.name,
  //     },
  //   ];
  // }

  async getPokemonsByType(type: string) {
    const response = await firstValueFrom(
      this.httpService.get(`https://pokeapi.co/api/v2/type/${type}`),
    );

    const pokemons = response.data.pokemon.map((item) => item.pokemon.name);

    return {
      type,
      total: pokemons.length,
      pokemons,
    };
}
  }

    
