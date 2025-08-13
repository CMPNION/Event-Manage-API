import { Module } from "@nestjs/common";
import { ConfigHostModule } from "./config/config.module";
import { DatabaseModule } from "./modules/database/database.module";
import { LocalesModule } from "./modules/locales/locales.module";
import { CacheModule } from "./modules/cache/cache.module";
import { EventsModule } from "./modules/events/events.module";
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigHostModule,
    DatabaseModule,
    LocalesModule,
    CacheModule,
    EventsModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
