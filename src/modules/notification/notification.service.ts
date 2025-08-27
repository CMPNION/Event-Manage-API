import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class NotificationService {
  constructor(@InjectQueue("event-notice") private notificationQueue: Queue) {}

  async addNoticeQueue(eventName: string, delay: number) {
    if (delay < 0) {
      delay = 0;
    }
    return await this.notificationQueue.add(
      "send",
      { message: `${eventName} will start soon!` },
      { delay: delay }
    );
  }
}
