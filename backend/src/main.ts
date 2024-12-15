import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

    app.enableCors({
      origin: "http://localhost:3000", 
      methods: "GET, POST, PUT, DELETE",
      allowedHeaders: "Content-Type",
    });
  await app.listen(3000); 
  console.log(`Application is running on: http://localhost:3000/api`);
}
bootstrap();
