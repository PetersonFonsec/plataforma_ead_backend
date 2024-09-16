import otelSDK from "./tracing";
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';
// import * as compression from 'compression';

import { AppModule } from './app.module';

async function bootstrap() {
  await otelSDK.start(); //O trace tem que estar antes da função NestFactory.create
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  // app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('Odin backend')
    .setDescription('The odin backend API documentation')
    .setVersion('1.0')
    .addTag('Odin')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
