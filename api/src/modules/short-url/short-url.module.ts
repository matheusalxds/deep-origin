import { Module } from '@nestjs/common';

import { ShortUrlUseCasesModule } from '@/modules/short-url/application/short-url-usecases.module';
import { ShortUrlGraphQL } from '@/modules/short-url/presentation/graphlq/short-url.resolver';

@Module({
  imports: [ShortUrlUseCasesModule],
  providers: [ShortUrlGraphQL],
})
export class ShortUrlModule {}
