import { v4 } from 'uuid';

import { ShortUrlEntity } from '@/modules/short-url/infra/repo/entities/short-url.entity';

export const mockShortUrl = (): ShortUrlEntity => ({
  createdAt: new Date(),
  id: v4(),
  originalUrl: 'any_url',
  shortUrl: 'any_url',
});
