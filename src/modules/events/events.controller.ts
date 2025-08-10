import { Controller, Delete, Get, Param } from "@nestjs/common";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("/list")
  async getAll() {
    return await this.eventsService.getAll();
  }

  @Get("/:uid")
  async getOne(@Param("uid") uid: string) {
    return await this.eventsService.getByUid(uid);
  }

  @Delete("/delete/:uid")
  async deleteOne(@Param("uid") uid: string) {
    return await this.eventsService.delete(uid);
  }
}
