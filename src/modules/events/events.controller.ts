import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/createEvent.dto";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("/list")
  async getAll() {
    return await this.eventsService.getAll();
  }

  @Get("/list/:uid")
  async getOne(@Param("uid") uid: string) {
    return await this.eventsService.getByUid(uid);
  }

  @Delete("/delete/:uid")
  async deleteOne(@Param("uid") uid: string) {
    return await this.eventsService.delete(uid);
  }

  @Post("/new")
  async newEvent(@Body() eventBody: CreateEventDto) {
    return this.eventsService.createEvent(eventBody);
  }
}
