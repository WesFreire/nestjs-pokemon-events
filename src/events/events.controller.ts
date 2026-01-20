import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

//  @Get()
//  getEvents() {
//   return this.eventsService.listEvents();
//  }

  @Get('type/:type')
  getPokemonReportByType(@Param('type') type: string) {
    return this.eventsService.buildPokemonTypeReport(type);
  }
}

