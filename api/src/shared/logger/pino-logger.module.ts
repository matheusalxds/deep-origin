import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Params, LoggerModule as PinoLogger } from 'nestjs-pino';
import { v4 } from 'uuid';

@Module({
  imports: [
    PinoLogger.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Params => ({
        pinoHttp: {
          enabled: configService.get('NODE_ENV')?.toLowerCase() !== 'test',
          level: configService.get('NODE_ENV')?.toLowerCase() === 'production' ? 'info' : 'debug',
          genReqId: (req: any) => req.headers.req_id || v4(),
          autoLogging: false,
          base: null,
          quietReqLogger: true,
          transport: {
            target: 'pino-pretty',
            options: {
              singleLine: true,
              colorize: true,
            },
          },
          redact: ['req.headers.authorization'],
        },
      }),
    }),
  ],
})
export class LoggerModule {}
