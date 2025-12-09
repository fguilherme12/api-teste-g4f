import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './common/configs/swagger.config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { corsConfig } from './common/configs/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  setupSwagger(app);
  app.enableCors(corsConfig);

  await app.listen(3000);
}
bootstrap();

