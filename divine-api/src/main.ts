import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CustomValidationError } from './types/CustomValidationError.type';
import { Response } from './types/Response.type';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Store Api')
    .setDescription('The api for store')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory(errors: ValidationError[]) {
        const messages = errors.map((err) => {
          return {
            property: err.property,
            errors: err.constraints,
          } as CustomValidationError;
        });
        throw new HttpException(
          {
            message: 'Input of user invalid!',
            data: messages,
          } as Response<CustomValidationError[]>,
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  await app.listen(process.env.STORE_PORT || 1234);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
