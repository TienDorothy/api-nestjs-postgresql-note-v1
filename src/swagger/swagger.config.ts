// swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('CRUD App Note and Authentication')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth() // Enable Bearer token authentication
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
