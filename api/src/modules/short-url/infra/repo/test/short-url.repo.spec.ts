import { MockProxy, mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { GetAllDTO } from '@/modules/short-url/application/dto/get-all.dto';
import { ShortUrlEntity } from '@/modules/short-url/infra/repo/entities/short-url.entity';
import { IShortUrlRepo, ShortUrlRepo } from '@/modules/short-url/infra/repo/short-url.repo';
import { mockShortUrl } from '@/modules/short-url/infra/repo/test/mocks/company.mock';
import { PgTestHelper } from '@/shared/database/postgresql/test/mock/pg-helper';
import { IIdGenerator } from '@/shared/id-generator/id-generator.interface';

describe('ShortUrlRepo', () => {
  let sut: IShortUrlRepo;
  let repo: Repository<ShortUrlEntity>;
  let idGen: MockProxy<IIdGenerator>;
  let uuid: string;

  beforeAll(async () => {
    await PgTestHelper.connect();
    repo = PgTestHelper.getRepository(ShortUrlEntity);
  });

  beforeEach(async () => {
    PgTestHelper.restore();
    idGen = mock();
    uuid = v4();
    idGen.gen.mockReturnValue(uuid);

    sut = new ShortUrlRepo(repo);
  });

  afterAll(async () => await PgTestHelper.disconnect());

  describe('create()', () => {
    it('should return an id on success', async () => {
      // ARRANGE
      const mockedShortUrl = mockShortUrl();
      mockedShortUrl.id = uuid;

      // ACT
      const shortUrl = await sut.create(mockedShortUrl);

      // ASSERT
      expect(shortUrl.id).toBe(mockedShortUrl.id);
      expect(shortUrl.shortUrl).toBe(mockedShortUrl.shortUrl);
      expect(shortUrl.originalUrl).toBe(mockedShortUrl.originalUrl);
      expect(shortUrl.createdAt).toBe(mockedShortUrl.createdAt);
    });
  });

  describe('getAll()', () => {
    const mockParams = (): GetAllDTO => ({
      filter: {},
      pagination: {
        page: 1,
        take: 1,
        skip(): number {
          return 0;
        },
      },
    });
    let mockedShortUrl: ShortUrlEntity;

    beforeEach(async () => {
      mockedShortUrl = mockShortUrl();
      await repo.insert(mockedShortUrl);
    });

    it('should return an array of short urls', async () => {
      // ARRANGE
      const mockedParams = mockParams();

      // ACT
      const shortUrlList = await sut.getAll(mockedParams);

      // ASSERT
      expect(shortUrlList[0].id).toBe(mockedShortUrl.id);
      expect(shortUrlList[0].shortUrl).toBe(mockedShortUrl.shortUrl);
      expect(shortUrlList[0].originalUrl).toBe(mockedShortUrl.originalUrl);
      expect(shortUrlList[0].createdAt).toBe(mockedShortUrl.createdAt);
    });

    it('should return correct short url if short url is provided', async () => {
      // ARRANGE
      const mockedParams = mockParams();
      mockedParams.filter.shortUrl = mockedShortUrl.shortUrl;

      // ACT
      const shortUrlList = await sut.getAll(mockedParams);

      // ASSERT
      expect(shortUrlList[0].id).toBe(mockedShortUrl.id);
      expect(shortUrlList[0].shortUrl).toBe(mockedShortUrl.shortUrl);
      expect(shortUrlList[0].originalUrl).toBe(mockedShortUrl.originalUrl);
      expect(shortUrlList[0].createdAt).toBe(mockedShortUrl.createdAt);
    });

    it('should return correct short url if id is provided', async () => {
      // ARRANGE
      const mockedParams = mockParams();
      mockedParams.filter.id = mockedShortUrl.id;

      // ACT
      const shortUrlList = await sut.getAll(mockedParams);

      // ASSERT
      expect(shortUrlList[0].id).toBe(mockedShortUrl.id);
      expect(shortUrlList[0].shortUrl).toBe(mockedShortUrl.shortUrl);
      expect(shortUrlList[0].originalUrl).toBe(mockedShortUrl.originalUrl);
      expect(shortUrlList[0].createdAt).toBe(mockedShortUrl.createdAt);
    });
  });

  describe('update()', () => {
    let mockedShortUrl: ShortUrlEntity;

    beforeEach(async () => {
      mockedShortUrl = mockShortUrl();
      await repo.insert(mockedShortUrl);
    });

    it('should return true on success', async () => {
      // ARRANGE
      const edit = 'edited_short_url';
      mockedShortUrl.shortUrl = edit;

      // ACT
      const response = await sut.update(mockedShortUrl.id, edit);

      // ASSERT
      expect(response).toBe(true);
    });
  });
});
