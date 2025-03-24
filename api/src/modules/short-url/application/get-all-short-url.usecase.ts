import { Inject } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { GetAllDTO } from '@/modules/short-url/application/dto/get-all.dto';
import { IShortUrlRepo, SHORT_URL_REPO } from '@/modules/short-url/infra/repo/short-url.repo';
import { ShortUrlOut } from '@/modules/short-url/presentation/graphlq/types/short-url';
import { LogMsgIn, msgEnd, msgStart } from '@/shared/logger/log-msg';

export const GET_ALL_SHORT_URL_USE_CASE = Symbol('GET_ALL_SHORT_URL_USE_CASE');

export interface IGetAllShortUrlUseCase {
  perform: (params: GetAllDTO) => Promise<ShortUrlOut[]>;
}

export class GetAllShortUrlUseCase implements IGetAllShortUrlUseCase {
  private readonly logMsg: LogMsgIn = { func: 'perform', svc: GetAllShortUrlUseCase.name };

  constructor(
    private readonly logger: PinoLogger,
    @Inject(SHORT_URL_REPO) readonly repo: IShortUrlRepo,
  ) {}

  async perform(params?: GetAllDTO): Promise<ShortUrlOut[]> {
    this.logger.info(msgStart(this.logMsg));

    const shortUrls = await this.repo.getAll(params);

    this.logger.info(msgEnd(this.logMsg, shortUrls));
    return shortUrls;
  }
}
