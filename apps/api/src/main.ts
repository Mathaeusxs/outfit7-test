/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Converts types automatically (e.g. "5" -> 5)
      whitelist: true, // Strips out properties not in DTOs
      forbidNonWhitelisted: true, // Throws error if extra fields are sent
      forbidUnknownValues: true, // Rejects completely unknown objects
      transformOptions: {
        enableImplicitConversion: true, // allows type conversion
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Events7')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
