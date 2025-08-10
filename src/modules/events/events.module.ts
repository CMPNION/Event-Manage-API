import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { CacheService } from "../cache/cache.service";

@Module({
  imports: [CacheService],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
