import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import validationOptions from './utils/validation-options';
import { HttpExceptionFilter } from './filters';
import { LoggingInterceptor } from './Interceptors';
import { CustomValidationPipe } from './pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const appPrefix = configService.get('APP_PREFIX');
  app.setGlobalPrefix(appPrefix);
  app.useGlobalPipes(
    new ValidationPipe(validationOptions),
    new CustomValidationPipe(),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.use((req: Request, res: Response, next: () => void) => {
    Logger.debug('===🚀 TRIGGER GLOBAL MIDDLEWARE 🚀===');
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${appPrefix}/docs`, app, document);
  const port = configService.get('APP_PORT');
  await app.listen(port, () => {
    console.log(`Environment: ${configService.get('NODE_ENV')}`);
    console.log(`Listening at http://localhost:${port}/${appPrefix}`);
    console.log(`API Docs: http://localhost:${port}/${appPrefix}/docs`);
  });
}
bootstrap();
