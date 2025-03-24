import { Pagination } from '@/shared/graphql/types/pagination';

export class GetAllFilter {
  id?: string;
  shortUrl?: string;
}

export class GetAllDTO {
  pagination?: Pagination;
  filter?: GetAllFilter;
}
