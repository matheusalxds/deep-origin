import { ShortURL } from '@/modules/short-url/domain/short-url.dto';

export const mockShortUrl = (): ShortURL => ({
  originalUrl: 'any_new_original_url',
  createdAt: new Date(),
  id: 'any_new_id',
  shortUrl: 'http://localhost:3001/any_short_url',
});
