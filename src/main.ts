import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    // Custom exception factory to format class-validator array errors into a clean string/array
    exceptionFactory: (errors) => {
      const messages = errors.map(
        (error) => `${error.property} has an issue: ${Object.values(error.constraints || {}).join(', ')}`
      );
      return new BadRequestException(messages);
    },
  }),
);

  app.useGlobalFilters(new HttpExceptionFilter());

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
