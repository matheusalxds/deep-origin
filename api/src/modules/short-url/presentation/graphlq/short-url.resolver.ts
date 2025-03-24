import { Inject, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CREATE_SHORT_URL_USE_CASE,
  ICreateShortUrlUseCase,
} from '@/modules/short-url/application/create-short-url.usecase';
import {
  GET_ALL_SHORT_URL_USE_CASE,
  IGetAllShortUrlUseCase,
} from '@/modules/short-url/application/get-all-short-url.usecase';
import {
  GET_ORIGINAL_URL_USE_CASE,
  IGetOriginalUrlUseCase,
} from '@/modules/short-url/application/get-original-url.usecase';
import { GET_SLUG_USE_CASE, IGetSlugUseCase } from '@/modules/short-url/application/get-slug.usecase';
import { IUpdateSlugUseCase, UPDATE_SLUG_USE_CASE } from '@/modules/short-url/application/update-slug.usecase';
import { CreateShortUrl, ShortUrlOut } from '@/modules/short-url/presentation/graphlq/types/short-url';
import { Pagination } from '@/shared/graphql/types/pagination';
import { GqlThrottlerGuard } from '@/shared/guard/throttler.guard';

@Resolver(() => ShortUrlOut)
export class ShortUrlGraphQL {
  constructor(
    @Inject(CREATE_SHORT_URL_USE_CASE) private createUseCase: ICreateShortUrlUseCase,
    @Inject(GET_ALL_SHORT_URL_USE_CASE) private getAllUseCase: IGetAllShortUrlUseCase,
    @Inject(GET_ORIGINAL_URL_USE_CASE) private getOriginalUrlUseCase: IGetOriginalUrlUseCase,
    @Inject(GET_SLUG_USE_CASE) private getSlugUseCase: IGetSlugUseCase,
    @Inject(UPDATE_SLUG_USE_CASE) private updateSlugUseCase: IUpdateSlugUseCase,
  ) {}

  @Mutation(() => ShortUrlOut)
  @UsePipes(new ValidationPipe({ transform: true }))
  async shortUrl(@Args({ name: 'input', type: () => CreateShortUrl }) input: CreateShortUrl): Promise<ShortUrlOut> {
    return this.createUseCase.perform(input);
  }

  @UseGuards(GqlThrottlerGuard)
  @Query(() => [ShortUrlOut])
  shortUrls(
    @Args('id', { type: () => String, nullable: true }) id?: string,
    @Args('pagination', { type: () => Pagination, nullable: true }) pagination?: Pagination,
  ): Promise<ShortUrlOut[]> {
    return this.getAllUseCase.perform({ pagination, filter: { id } });
  }

  @UseGuards(GqlThrottlerGuard)
  @Query(() => String)
  getSlug(@Args('id', { type: () => String }) id: string): Promise<string> {
    return this.getSlugUseCase.perform(id);
  }

  @UseGuards(GqlThrottlerGuard)
  @Query(() => String)
  originalUrl(@Args('shortUrl', { type: () => String, nullable: true }) shortUrl?: string): Promise<string> {
    return this.getOriginalUrlUseCase.perform(shortUrl);
  }

  @UseGuards(GqlThrottlerGuard)
  @Mutation(() => Boolean)
  updateSlug(
    @Args('id', { type: () => String, nullable: false }) id?: string,
    @Args('shortUrl', { type: () => String, nullable: false }) shortUrl?: string,
  ): Promise<boolean> {
    return this.updateSlugUseCase.perform(id, shortUrl);
  }
}
