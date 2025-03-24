import { Inject } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { IShortUrlRepo, SHORT_URL_REPO } from '@/modules/short-url/infra/repo/short-url.repo';
import { Pagination } from '@/shared/graphql/types/pagination';
import { LogMsgIn, msgEnd, msgStart } from '@/shared/logger/log-msg';

export const GET_SLUG_USE_CASE = Symbol('GET_SLUG_USE_CASE');

export interface IGetSlugUseCase {
  perform: (id: string) => Promise<string>;
}

export class GetSlugUseCase implements IGetSlugUseCase {
  private readonly logMsg: LogMsgIn = { func: 'perform', svc: GetSlugUseCase.name };

  constructor(
    private readonly logger: PinoLogger,
    @Inject(SHORT_URL_REPO) readonly repo: IShortUrlRepo,
  ) {}

  async perform(id: string): Promise<string> {
    this.logger.info(msgStart(this.logMsg));

    const [entity] = await this.repo.getAll({ pagination: new Pagination(), filter: { id } });
    const split = entity.shortUrl.split('/');
    const slug = split[split.length - 1];

    this.logger.info(msgEnd(this.logMsg, { entity, slug }));
    return slug;
  }
}
