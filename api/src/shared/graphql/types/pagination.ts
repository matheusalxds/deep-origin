import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

@InputType()
@ArgsType()
export class Pagination {
  @Field(() => Int, { defaultValue: 1, nullable: true })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Field(() => Int, { defaultValue: 10, nullable: true })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  take?: number = 10;

  skip(): number {
    return (this.page - 1) * this.take;
  }
}
