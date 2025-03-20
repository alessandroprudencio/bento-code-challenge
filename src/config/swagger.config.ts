import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Bento API')
    .setDescription(
      'RESTful API for integration with the Bento API, calculation of delivery rate with margin and storage of requests.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    autoTagControllers: true,
  });
  SwaggerModule.setup('api/docs', app, document);
}
