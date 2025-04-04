import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve 'uploads' folder as a static directory
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.use('/GANuploads', express.static(join(__dirname, '..', 'GANuploads')));
  app.use('/CUSuploads', express.static(join(__dirname, '..', 'CUSuploads')));
  app.use(bodyParser.json()); // ✅ Ensure body parsing

  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend URL (if different)
    credentials: true, // Allow credentials if needed
  });

  await app.listen(3000);

}
bootstrap();
