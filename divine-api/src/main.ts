import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CustomValidationError } from './types/CustomValidationError.type';
import { MyException } from './commons/filters/my.filter';
import { CatchEveryThing } from './commons/filters/catch-everything.filter';
const cookieParser = require('cookie-parser');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());

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
          return [err.property, err.constraints] as CustomValidationError;
        });
        throw new MyException({
          status_code: HttpStatus.BAD_REQUEST,
          message: 'Input of user invalid!',
          errors: Object.fromEntries(messages),
        });
      },
    }),
  );

  app.useGlobalFilters(new CatchEveryThing());

  await app.listen(process.env.STORE_PORT || 1234);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
