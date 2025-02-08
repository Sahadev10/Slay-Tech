import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve 'uploads' folder as a static directory
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend URL (if different)
    credentials: true, // Allow credentials if needed
  });

  await app.listen(3000);

}
bootstrap();
