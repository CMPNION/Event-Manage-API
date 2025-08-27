import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";
import { NotificationService } from "./notification.service";

@Processor("event-notice")
export class NotificationsProcessor {
    constructor(private readonly notificationService: NotificationService) {}
    @Process("send")
    handleSend(job: Job<{ message: string }>) {
        console.log("📩 Уведомление:", job.data.message);
    }
}
