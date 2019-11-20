import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './shared/logger.interceptor';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  await app.listen(port);

  Logger.log(`App is running on the port ${port}`, 'Bootstrap');
  if (process.env.NODE_ENV === 'test') Logger.log('Test in progress. Testing db connected', 'Bootstrap');
}
bootstrap();
