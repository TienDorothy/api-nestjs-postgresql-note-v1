import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger/swagger.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add middleware
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
