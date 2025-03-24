import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { Env } from '@/shared/env/env';

import { SnakeNamingStrategy } from './strategy/snake-naming.strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<Env, true>) => ({
        type: 'postgres',
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        host: configService.get('DB_HOST'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [join(__dirname, './entities/**/*.entity{.js,.ts}')],
        migrations: [join(__dirname, './migrations/**/*{.js,.ts}')],
        migrationsRun: true,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PostgresqlModule {}
