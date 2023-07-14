import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ErrorValidate } from './Types/ErrorValidate.type';
import { ApiResponse } from './Types/ApiResponse.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Van Loc Store Api')
    .setDescription('The api for store')
    .setVersion('1.0')
    .addBearerAuth()
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
          } as ErrorValidate;
        });
        throw new HttpException(
          {
            message: 'Input of user invalid!',
            data: messages,
          } as ApiResponse<ErrorValidate[]>,
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  await app.listen(process.env.STORE_PORT || 1234);
}
bootstrap();
