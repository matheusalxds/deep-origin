import { Inject } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { IShortUrlRepo, SHORT_URL_REPO } from '@/modules/short-url/infra/repo/short-url.repo';
import { Pagination } from '@/shared/graphql/types/pagination';
import { LogMsgIn, msgEnd, msgStart } from '@/shared/logger/log-msg';

export const GET_ORIGINAL_URL_USE_CASE = Symbol('GET_ORIGINAL_URL_USE_CASE');

export interface IGetOriginalUrlUseCase {
  perform: (shortUrl?: string) => Promise<string>;
}

export class GetOriginalUrlUseCase implements IGetOriginalUrlUseCase {
  private readonly logMsg: LogMsgIn = { func: 'perform', svc: GetOriginalUrlUseCase.name };

  constructor(
    private readonly logger: PinoLogger,
    @Inject(SHORT_URL_REPO) readonly repo: IShortUrlRepo,
  ) {}

  async perform(shortUrl?: string): Promise<string> {
    this.logger.info(msgStart(this.logMsg));

    const shortUrls = await this.repo.getAll({ pagination: new Pagination(), filter: { shortUrl } });

    this.logger.info(msgEnd(this.logMsg, shortUrls));
    return shortUrls[0]?.originalUrl;
  }
}
