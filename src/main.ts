import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  Logger.log(`App is running on the port ${port}`, 'Bootstrap');
  if (process.env.NODE_ENV === 'test') Logger.log('Test in progress. Testing db connected', 'Bootstrap');
}
bootstrap();
