// src/modules/events/events.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { EventModel } from "./models/event.model";
import { CacheService } from "../cache/cache.service";
import { IEvent } from "src/interfaces/IEvent.interface";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { CreateEventDto } from "./dto/createEvent.dto";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(EventModel) private eventModel: typeof EventModel,
    private readonly cacheService: CacheService,
    private readonly notificationService: NotificationService
  ) {}

  async getAll(): Promise<IEvent[]> {
    const cacheKey = "events:All";
    let data = await this.cacheService.get<IEvent[]>(cacheKey);

    if (!data) {
      data = await this.eventModel.findAll({
        raw: true,
        where: { allowed: true },
      });
      await this.cacheService.save(cacheKey, data);
    }

    return data;
  }

  async getByUid(uid: string): Promise<IEvent | null> {
    const cacheKey = `events:${uid}`;
    let data = await this.cacheService.get<IEvent>(cacheKey);

    if (!data) {
      data = await this.eventModel.findByPk(uid, { raw: true });
      await this.cacheService.save(cacheKey, data);
    }
    return data;
  }

  async delete(
    uid: string,
    userId: number
  ): Promise<boolean | UnauthorizedException> {
    const deleted = await this.eventModel.findByPk(uid);
    if (deleted?.ownerId == userId) {
      deleted?.destroy;
      await this.cacheService.clear();
      return true;
    }
    return new UnauthorizedException(
      "You have no perrmission to delete this event"
    );
  }

  async updateEvent(
    uid: string,
    eventBody: UpdateEventDto,
    userid: number
  ): Promise<IEvent | NotFoundException | UnauthorizedException> {
    const event = await this.eventModel.findByPk(uid);

    if (!event) {
      return new NotFoundException(`Event with uid:${uid} not found`);
    }

    if (event.ownerId == userid) {
      await event.update(eventBody);
      await this.cacheService.clear();
      return event;
    } else {
      return new UnauthorizedException(
        "You have no perrmission to edit this event"
      );
    }
  }

  async createEvent(
    eventBody: CreateEventDto,
    userid: number
  ): Promise<IEvent> {
    const event = await this.eventModel.create({
      ...eventBody,
      ownerId: userid,
    });

    await this.cacheService.clear();

    return event;
  }

  async getPendingEvents() {
    return this.eventModel.findAll({ where: { allowed: false } });
  }

  async allowEvent(uid: string): Promise<IEvent> {
    const [_, [updatedEvent]] = await this.eventModel.update(
      { allowed: true },
      {
        where: { eventUid: uid },
        returning: true,
      }
    );

    const delay = updatedEvent.date.getTime() - Date.now() + 3 * 60 * 60 * 1000;

    this.notificationService.addNoticeQueue(updatedEvent.name, delay);

    if (!updatedEvent) {
      throw new Error(`Event with uid=${uid} not found`);
    }

    return updatedEvent;
  }
}
