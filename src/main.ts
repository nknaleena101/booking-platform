import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips away non-whitelisted properties from request body
    transform: true, // Automatically transforms payloads to be objects typed according to their DTO classes
  }));

  // 1. Setup Swagger Configuration Options
  const config = new DocumentBuilder()
    .setTitle('EN2H Booking Platform API')
    .setDescription('Backend REST API for managing services and customer bookings.')
    .setVersion('1.0')
    .addBearerAuth() // Adds a JWT Lock button in Swagger UI for protected routes
    .build();

  // 2. Create the Swagger Document
  const document = SwaggerModule.createDocument(app, config);

  // 3. Setup the Swagger UI Endpoint (accessible at http://localhost:3000/api)
  SwaggerModule.setup('api', app, document);

  // Start the backend server on port 3000
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger Documentation available at: ${await app.getUrl()}/api`);
}
bootstrap();
