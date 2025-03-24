import { Module } from '@nestjs/common';

import { ShortUrlModule } from '@/modules/short-url/short-url.module';
import { PostgresqlModule } from '@/shared/database/postgresql/postgresql.module';
import { GraphQLModule } from '@/shared/graphql/graphql.module';
import { DateScalar } from '@/shared/graphql/types/scalar-date';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [SharedModule, PostgresqlModule, GraphQLModule, ShortUrlModule],
  providers: [DateScalar],
})
export class AppModule {}
