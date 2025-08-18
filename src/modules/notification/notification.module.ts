import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { QueueModule } from "../queue/queue.module";

@Module({
  imports: [QueueModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
