import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
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
      "Authorization"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет лишние поля, которых нет в DTO
      forbidNonWhitelisted: true, // выбросит ошибку, если пришли лишние поля
      transform: true, // преобразует строки в числа/даты, если указано в DTO
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
