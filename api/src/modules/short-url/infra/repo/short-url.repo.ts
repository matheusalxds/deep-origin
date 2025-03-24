import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetAllDTO } from '@/modules/short-url/application/dto/get-all.dto';
import { ShortUrlEntity } from '@/modules/short-url/infra/repo/entities/short-url.entity';

export const SHORT_URL_REPO = Symbol('SHORT_URL_REPO');

export interface IShortUrlRepo {
  create: (input: Partial<ShortUrlEntity>) => Promise<ShortUrlEntity>;
  getAll: (params?: GetAllDTO) => Promise<ShortUrlEntity[]>;
  update: (id: string, shortUrl: string) => Promise<boolean>;
}

export class ShortUrlRepo implements IShortUrlRepo {
  constructor(@InjectRepository(ShortUrlEntity) private readonly repo: Repository<ShortUrlEntity>) {}

  async create(input: Partial<ShortUrlEntity>): Promise<ShortUrlEntity> {
    return this.repo.save(input);
  }

  async getAll({ pagination, filter }: GetAllDTO): Promise<ShortUrlEntity[]> {
    const query = this.repo
      .createQueryBuilder('main')
      .skip(pagination.skip())
      .take(pagination.take <= 0 ? undefined : pagination.take);

    if (filter?.id) query.andWhere('main.id = :id', { id: filter.id });
    if (filter?.shortUrl) query.andWhere('main.shortUrl = :shortUrl', { shortUrl: filter.shortUrl });

    const response = await query.getMany();
    return response;
  }

  async update(id: string, shortUrl: string): Promise<boolean> {
    const { affected } = await this.repo.update({ id }, { shortUrl });
    return !!affected;
  }
}
