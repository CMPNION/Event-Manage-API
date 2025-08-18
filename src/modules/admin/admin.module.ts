import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { EventsModule } from "../events/events.module";

@Module({
  imports: [EventsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
