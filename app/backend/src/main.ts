import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useBodyParser('raw', { limit: '10mb', type: 'application/octet-stream' });
  await app.listen(3000);
}
bootstrap();
