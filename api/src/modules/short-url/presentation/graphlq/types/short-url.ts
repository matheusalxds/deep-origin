import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsString, IsUrl } from 'class-validator';

@ObjectType()
export class ShortUrlOut {
  @Field(() => String)
  id: string;

  @Field(() => String)
  shortUrl: string;

  @Field(() => String)
  originalUrl: string;

  @Field(() => Date)
  createdAt: Date;
}

@InputType()
export class ShortUrlInput {
  @Field()
  @IsString({ message: 'validation.IS_STRING' })
  @IsUrl(undefined, { message: 'validation.IS_URL' })
  originalUrl: string;
}

@InputType()
export class CreateShortUrl extends PickType(ShortUrlInput, ['originalUrl'] as const) {}
