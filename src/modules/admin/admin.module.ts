import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { EventsModule } from "../events/events.module";

@Module({
    imports: [EventsModule],
    controllers: [AdminController],
    providers: [],
})
export class AdminModule {}
