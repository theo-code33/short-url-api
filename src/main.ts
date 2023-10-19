import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UrlModule } from './url/url.module';
import { ValidationPipe } from '@nestjs/common';

const VERSION = '0.9';
const PORT = 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v0', {
    exclude: ['documentation', 'documentation-dev'],
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Shortener URL API')
    .setDescription(
      'Welcome to Shortener URL API, here you can create shortener url and redirect to original url.',
    )
    .setVersion(VERSION)
    .addTag('url')
    .addBearerAuth()
    .addSecurity('x-api-key', {
      type: 'apiKey',
      in: 'header',
    })
    .build();

  const options = {
    include: [UrlModule],
    ignoreGlobalPrefix: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('documentation', app, document);
  if (process.env.NODE_ENV === 'production') {
    const configDev = new DocumentBuilder()
      .setTitle('Shortener URL API - Development')
      .setDescription(
        'Welcome to Shortener URL API, here you can create shortener url and redirect to original url. This is a development environment.',
      )
      .setVersion(VERSION)
      .addTag('url')
      .addTag('api-key')
      .addTag('user')
      .addTag('auth')
      .addServer(`http://localhost:${PORT}/api/v0`)
      .addBearerAuth()
      .addSecurity('x-api-key', {
        type: 'apiKey',
        in: 'header',
      })
      .build();

    const options = {
      ignoreGlobalPrefix: true,
    };

    const documentDev = SwaggerModule.createDocument(app, configDev, options);
    SwaggerModule.setup('documentation-dev', app, documentDev);
  }

  await app.listen(PORT);
}
bootstrap();
