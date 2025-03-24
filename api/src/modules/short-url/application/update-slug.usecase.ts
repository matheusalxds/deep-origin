import { Inject } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { IShortUrlRepo, SHORT_URL_REPO } from '@/modules/short-url/infra/repo/short-url.repo';
import { ENV_SERVICE, IEnvService } from '@/shared/env/env.service';
import { LogMsgIn, msgEnd, msgStart } from '@/shared/logger/log-msg';

export const UPDATE_SLUG_USE_CASE = Symbol('UPDATE_SLUG_USE_CASE');

export interface IUpdateSlugUseCase {
  perform: (id: string, newSlug: string) => Promise<boolean>;
}

export class UpdateSlugUseCase implements IUpdateSlugUseCase {
  private readonly logMsg: LogMsgIn = { func: 'perform', svc: UpdateSlugUseCase.name };

  constructor(
    private readonly logger: PinoLogger,
    @Inject(ENV_SERVICE) readonly envService: IEnvService,
    @Inject(SHORT_URL_REPO) readonly repo: IShortUrlRepo,
  ) {}

  async perform(id: string, newSlug: string): Promise<boolean> {
    this.logger.info(msgStart(this.logMsg, { id, newSlug }));

    const slugUrl = this.envService.get('SLUG_URL');
    const shortUrl = `${slugUrl}/${newSlug}`;
    const updated = await this.repo.update(id, shortUrl);

    this.logger.info(msgEnd(this.logMsg, { updated }));
    return updated;
  }
}
