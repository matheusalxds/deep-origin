import { Inject } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { ENV_SERVICE, IEnvService } from '@/shared/env/env.service';
import { ID_GENERATOR } from '@/shared/id-generator/id-generator.interface';
import { UUIDAdapter } from '@/shared/id-generator/uuid.adapter';
import { LogMsgIn, msgEnd, msgStart } from '@/shared/logger/log-msg';

export const CREATE_SLUG_USE_CASE = Symbol('CREATE_SLUG_USE_CASE');

export interface ICreateSlugUseCase {
  perform: () => string;
}

export class CreateSlugUseCase implements ICreateSlugUseCase {
  private readonly logMsg: LogMsgIn = { func: 'perform', svc: CreateSlugUseCase.name };

  constructor(
    private readonly logger: PinoLogger,
    @Inject(ID_GENERATOR) readonly idGen: UUIDAdapter,
    @Inject(ENV_SERVICE) readonly envService: IEnvService,
  ) {}

  perform(): string {
    this.logger.info(msgStart(this.logMsg));

    const slugUrl = this.envService.get('SLUG_URL');
    const uniqueSlug = this.idGen.gen().split('-')[0];
    const shortUrl = `${slugUrl}/${uniqueSlug}`;

    this.logger.info(msgEnd(this.logMsg, { shortUrl }));
    return shortUrl;
  }
}
