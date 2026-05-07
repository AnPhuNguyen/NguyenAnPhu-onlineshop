import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

/**
 * Bootstrap function để khởi động ứng dụng
 * Cấu hình toàn cục và khởi động server
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security middleware
  app.use(helmet());
  app.use(cookieParser());

  // Global prefix cho API
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map(error => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return {
          success: false,
          statusCode: 400,
          message: 'Validation failed',
          errors: formattedErrors,
        };
      },
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Frontend URLs
    credentials: true,
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('LiteCommerce API')
    .setDescription('API documentation for LiteCommerce e-commerce platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Start server
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap();
