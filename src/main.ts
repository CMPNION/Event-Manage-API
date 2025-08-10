import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { I18nService } from "nestjs-i18n";
import { ValidationPipe } from "./infrastructure/pipes/validation.pipe";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Документация проекта")
        .setDescription("")
        .setVersion("1.0")
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                in: "header",
                "x-tokenName": "Authorization",
            },
            "Authorization",
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("/api/docs", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    app.enableCors();

    const validationPipe = new ValidationPipe(app.get(I18nService));
    app.useGlobalPipes(validationPipe);

    await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
