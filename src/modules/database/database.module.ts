import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { EventModel } from "../events/models/event.model";

@Module({
    imports: [
        SequelizeModule.forRoot({
            logging: false,
            dialect: "postgres",
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            dialectOptions: {
                charset: "utf8",
            },
            define: {
                charset: "utf8",
                collate: "utf8_general_ci",
            },
            autoLoadModels: true,
            synchronize: true,
            retryAttempts: 3,
            models: [EventModel],
        }),
    ],
    exports: [SequelizeModule],
})
export class DatabaseModule {}
