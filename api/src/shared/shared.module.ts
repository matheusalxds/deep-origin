import { Global, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { EnvModule } from '@/shared/env/env.module';
import { IdGeneratorModule } from '@/shared/id-generator/id-generator.module';
import { LoggerModule } from '@/shared/logger/pino-logger.module';
import { TranslateModule } from '@/shared/translator/translate.module';

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 30 }] }),
    EnvModule,
    LoggerModule,
    TranslateModule,
    IdGeneratorModule,
  ],
  exports: [EnvModule, LoggerModule, TranslateModule, IdGeneratorModule],
})
export class SharedModule {}
