import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { EventModel } from "./models/event.model";

@Module({
    imports: [SequelizeModule.forFeature([EventModel])],
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule {}
