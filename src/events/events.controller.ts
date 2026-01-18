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
  getPokemonsByType(@Param('type') type:string) {
    return this.eventsService.getPokemonsByType(type)
  }
}
