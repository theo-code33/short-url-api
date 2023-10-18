import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UrlModule } from './url/url.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v0', {
    exclude: ['documentation'],
  });
  const config = new DocumentBuilder()
    .setTitle('Shortener URL API')
    .setDescription(
      'Welcome to Shortener URL API, here you can create shortener url and redirect to original url.',
    )
    .setVersion('0.9')
    .addTag('url')
    .addBearerAuth()
    .addSecurity('x-api-key', {
      type: 'apiKey',
    })
    .build();

  const options = {
    include: [UrlModule],
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(3000);
}
bootstrap();
