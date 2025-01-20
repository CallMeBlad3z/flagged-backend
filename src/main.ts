import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(process.env.SSL_KEY),
    cert: readFileSync(process.env.SSL_CERT),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Enable all log levels
  });

  // Log HTTPS options to confirm they are being used
  //Logger.log('HTTPS options:', httpsOptions);

  // Configure CORS
  app.enableCors({
    origin: 'https://flagged-app.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
  Logger.log('Application is running on: ' + await app.getUrl());
}
bootstrap();
