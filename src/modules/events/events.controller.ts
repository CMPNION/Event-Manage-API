import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/createEvent.dto";
import { JwtAuthGuard } from "src/infrastructure/guards/jwt-auth.guard";
import { Roles } from "../../infrastructure/decorators/auth.decorator";
import { RolesGuard } from "src/infrastructure/guards/roles.guard";
import { User } from "src/infrastructure/decorators/user.decorator";
import { UpdateEventDto } from "./dto/updateEvent.dto";

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "club-admin")
  @Post("/create")
  async createEvent(
    @Body() eventBody: CreateEventDto,
    @User("id") userId: number
  ) {
    return await this.eventsService.createEvent(eventBody, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "club-admin")
  @Patch("/update/:uid")
  async updateEvent(
    @Param("uid") eventUid: string,
    @Body() eventBody: UpdateEventDto,
    @User("id") userId: number
  ) {
    return await this.eventsService.updateEvent(eventUid, eventBody, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "club-admin")
  @Delete("delete/:uid")
  async deleteEvent(
    @User("id") userId: number,
    @Param("uid") eventUid: string
  ) {
    return await this.eventsService.delete(eventUid, userId);
  }
}
