import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: "event-notice",
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
