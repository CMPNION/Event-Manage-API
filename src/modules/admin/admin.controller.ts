import { Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { EventsService } from "../events/events.service";
import { JwtAuthGuard } from "src/infrastructure/guards/jwt-auth.guard";
import { RolesGuard } from "src/infrastructure/guards/roles.guard";
import { Roles } from "src/infrastructure/decorators/auth.decorator";

@Controller("admin")
export class AdminController {
    constructor(private readonly eventSerivce: EventsService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("admin")
    @Patch("/allow/:uid")
    async allowEvent(@Param("uid") uid: string) {
        return this.eventSerivce.allowEvent(uid);
    }
}
