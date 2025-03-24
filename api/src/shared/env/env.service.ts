import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '@/shared/env/env';

export const ENV_SERVICE = Symbol('ENV_SERVICE');

export interface IEnvService {
  get: <T extends keyof Env>(key: T) => string;
}

@Injectable()
export class EnvService implements IEnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T): string {
    return this.configService.get(key, { infer: true });
  }
}
