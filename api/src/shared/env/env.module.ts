import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from '@/shared/env/env';
import { useClass } from '@/shared/utils/provider-generator';

import { ENV_SERVICE, EnvService } from './env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  providers: [useClass(ENV_SERVICE, EnvService)],
  exports: [ENV_SERVICE],
})
export class EnvModule {}
