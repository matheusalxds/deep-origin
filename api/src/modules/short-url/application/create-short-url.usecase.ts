import { Inject } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { CREATE_SLUG_USE_CASE, ICreateSlugUseCase } from '@/modules/short-url/application/create-slug.usecase';
import { ShortURL } from '@/modules/short-url/domain/short-url.dto';
import { IShortUrlRepo, SHORT_URL_REPO } from '@/modules/short-url/infra/repo/short-url.repo';
import { CreateShortUrl, ShortUrlOut } from '@/modules/short-url/presentation/graphlq/types/short-url';
import { ID_GENERATOR } from '@/shared/id-generator/id-generator.interface';
import { UUIDAdapter } from '@/shared/id-generator/uuid.adapter';
import { LogMsgIn, msgEnd, msgStart } from '@/shared/logger/log-msg';

export const CREATE_SHORT_URL_USE_CASE = Symbol('CREATE_SHORT_URL_USE_CASE');

export interface ICreateShortUrlUseCase {
  perform: (input: CreateShortUrl) => Promise<ShortUrlOut>;
}

export class CreateShortUrlUseCase implements ICreateShortUrlUseCase {
  private readonly logMsg: LogMsgIn = { func: 'perform', svc: CreateShortUrlUseCase.name };

  constructor(
    private readonly logger: PinoLogger,
    @Inject(SHORT_URL_REPO) readonly repo: IShortUrlRepo,
    @Inject(ID_GENERATOR) readonly idGen: UUIDAdapter,
    @Inject(CREATE_SLUG_USE_CASE) readonly genSlug: ICreateSlugUseCase,
  ) {}

  async perform(input: CreateShortUrl): Promise<ShortUrlOut> {
    this.logger.info(msgStart(this.logMsg, input));

    const shortUrlDAO = new ShortURL();
    shortUrlDAO.id = this.idGen.gen();
    shortUrlDAO.shortUrl = this.genSlug.perform();
    shortUrlDAO.originalUrl = input.originalUrl;

    const newShortUrl = await this.repo.create(shortUrlDAO);

    this.logger.info(msgEnd(this.logMsg, newShortUrl));
    return newShortUrl;
  }
}
