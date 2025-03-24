import { Module } from '@nestjs/common';

import {
  CREATE_SHORT_URL_USE_CASE,
  CreateShortUrlUseCase,
} from '@/modules/short-url/application/create-short-url.usecase';
import { CREATE_SLUG_USE_CASE, CreateSlugUseCase } from '@/modules/short-url/application/create-slug.usecase';
import {
  GET_ALL_SHORT_URL_USE_CASE,
  GetAllShortUrlUseCase,
} from '@/modules/short-url/application/get-all-short-url.usecase';
import {
  GET_ORIGINAL_URL_USE_CASE,
  GetOriginalUrlUseCase,
} from '@/modules/short-url/application/get-original-url.usecase';
import { GET_SLUG_USE_CASE, GetSlugUseCase } from '@/modules/short-url/application/get-slug.usecase';
import { UPDATE_SLUG_USE_CASE, UpdateSlugUseCase } from '@/modules/short-url/application/update-slug.usecase';
import { ShortUrlRepoModule } from '@/modules/short-url/infra/repo/short-url-repo.module';
import { useClass } from '@/shared/utils/provider-generator';

@Module({
  imports: [ShortUrlRepoModule],
  providers: [
    useClass(CREATE_SHORT_URL_USE_CASE, CreateShortUrlUseCase),
    useClass(CREATE_SLUG_USE_CASE, CreateSlugUseCase),
    useClass(GET_ALL_SHORT_URL_USE_CASE, GetAllShortUrlUseCase),
    useClass(GET_ORIGINAL_URL_USE_CASE, GetOriginalUrlUseCase),
    useClass(GET_SLUG_USE_CASE, GetSlugUseCase),
    useClass(UPDATE_SLUG_USE_CASE, UpdateSlugUseCase),
  ],
  exports: [
    CREATE_SHORT_URL_USE_CASE,
    CREATE_SLUG_USE_CASE,
    GET_ALL_SHORT_URL_USE_CASE,
    GET_ORIGINAL_URL_USE_CASE,
    GET_SLUG_USE_CASE,
    UPDATE_SLUG_USE_CASE,
  ],
})
export class ShortUrlUseCasesModule {}
