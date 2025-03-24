import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { GraphQLValidationExceptionFilter } from '@/shared/filter/graphql-error.filter';

export const appSetup = (app: NestExpressApplication) => {
  app.disable('x-powered-by');
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GraphQLValidationExceptionFilter());
  app.enableCors();
  app.use(helmet());
  app.use(compression());
};
