// src/modules/events/events.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { EventModel } from "./models/event.model";
import { CacheService } from "../cache/cache.service";
import { IEvent } from "src/interfaces/IEvent.interface";

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(EventModel) private eventModel: typeof EventModel,
    private readonly cacheService: CacheService
  ) {}

  async getAll(): Promise<IEvent[]> {
    const cacheKey = "events:All";
    let data = await this.cacheService.get<IEvent[]>(cacheKey);

    if (!data) {
      data = await this.eventModel.findAll({ raw: true });
      await this.cacheService.save(cacheKey, data);
    }

    return data;
  }

  async getByUid(uid: string): Promise<IEvent | null> {
    const cacheKey = `events:${uid}`;
    let data = await this.cacheService.get<IEvent>(cacheKey);

    if (!data) {
      data = await this.eventModel.findByPk(uid, { raw: true });
      this.cacheService.save(cacheKey, data);
    }
    return data;
  }

  async delete(uid: string): Promise<number> {
    const deletedCount = await this.eventModel.destroy({
      where: { eventUid: uid },
    });
    await this.cacheService.clear();
    return deletedCount;
  }
}
