import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShortUrlEntity } from '@/modules/short-url/infra/repo/entities/short-url.entity';
import { SHORT_URL_REPO, ShortUrlRepo } from '@/modules/short-url/infra/repo/short-url.repo';
import { useClass } from '@/shared/utils/provider-generator';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrlEntity])],
  providers: [useClass(SHORT_URL_REPO, ShortUrlRepo)],
  exports: [SHORT_URL_REPO],
})
export class ShortUrlRepoModule {}
