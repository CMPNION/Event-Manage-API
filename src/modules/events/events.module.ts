import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { EventModel } from "./models/event.model";
import { NotificationModule } from "../notification/notification.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        SequelizeModule.forFeature([EventModel]),
        NotificationModule,
        JwtModule,
    ],
    controllers: [EventsController],
    providers: [EventsService],
    exports: [EventsService],
})
export class EventsModule {}
