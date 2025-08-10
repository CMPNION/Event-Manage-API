import { Module } from "@nestjs/common";
import { ConfigHostModule } from "./config/config.module";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./modules/database/database.module";
import { LocalesModule } from "./modules/locales/locales.module";
import { CacheModule } from "./modules/cache/cache.module";
import { EventsModule } from './modules/events/events.module';

@Module({
    imports: [ConfigHostModule, DatabaseModule, LocalesModule, CacheModule, EventsModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
