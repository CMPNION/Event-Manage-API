import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { QueueModule } from "../queue/queue.module";
import { NotificationsProcessor } from "./notification.processor";

@Module({
    imports: [QueueModule],
    providers: [NotificationService, NotificationsProcessor],
    exports: [NotificationService],
})
export class NotificationModule {}
