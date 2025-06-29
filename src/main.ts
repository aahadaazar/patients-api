import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Patient Management API') // Title of your API documentation
    .setDescription('API documentation for the Patient Management System') // Description
    .setVersion('1.0') // API version
    .addBearerAuth(
      // Add Bearer token authentication option for secured endpoints
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token', // This is the name you'll use to refer to this security scheme
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Serve Swagger UI at /api
  SwaggerModule.setup('api', app, document);
  // --- End Swagger Configuration ---

  app.enableCors(); // Enable CORS for frontend integration

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation available at: ${await app.getUrl()}/api`);
}
bootstrap();
