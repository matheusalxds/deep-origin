import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

import { AppModule } from '@/modules/app.module';
import { appSetup } from '@/shared/config/app-setup';
import { ENV_SERVICE, IEnvService } from '@/shared/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
  const env = app.get<IEnvService>(ENV_SERVICE);
  const logger = app.get<Logger>(Logger);

  appSetup(app);

  const port = env.get('PORT');
  app.listen(port).then(() => logger.log(`Server has been started on port: ${port}!`));
}

bootstrap();
