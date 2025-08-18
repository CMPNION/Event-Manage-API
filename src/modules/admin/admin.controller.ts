import { Controller, Param, Patch } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { EventsService } from "../events/events.service";

@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly eventSerivce: EventsService
  ) {}

  @Patch("/allow/:uid")
  async allowEvent(@Param("uid") uid: string) {
    return this.eventSerivce.allowEvent(uid);
  }
}
