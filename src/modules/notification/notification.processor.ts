import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";
import { NotificationService } from "./notification.service";

@Processor("notifications")
export class NotificationsProcessor {
  constructor(private readonly notificationService: NotificationService) {}
  @Process("send")
  async handleSend(job: Job<{ message: string }>) {
    console.log("📩 Уведомление:", job.data.message);
  }
}
