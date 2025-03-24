import { MockProxy, mock } from 'jest-mock-extended';
import * as MockDate from 'mockdate';
import { PinoLogger } from 'nestjs-pino';

import { GetAllDTO } from '@/modules/short-url/application/dto/get-all.dto';
import {
  GetAllShortUrlUseCase,
  IGetAllShortUrlUseCase,
} from '@/modules/short-url/application/get-all-short-url.usecase';
import { mockShortUrl } from '@/modules/short-url/domain/test/mock/short-url.mock';
import { IShortUrlRepo } from '@/modules/short-url/infra/repo/short-url.repo';

const mockParams = (): GetAllDTO => ({
  pagination: {
    page: 1,
    take: 10,
    skip(): number {
      return 10;
    },
  },
  filter: { shortUrl: 'any_short_url', id: 'any_id' },
});

describe('GetAllShortUrlUseCase', () => {
  let sut: IGetAllShortUrlUseCase;
  let logger: MockProxy<PinoLogger>;
  let repo: MockProxy<IShortUrlRepo>;
  const mockedShortUrl = mockShortUrl();

  beforeEach(() => {
    MockDate.set(new Date());

    logger = mock();
    repo = mock();
    repo.getAll.mockResolvedValue([mockedShortUrl]);

    sut = new GetAllShortUrlUseCase(logger, repo);
  });

  afterAll(() => MockDate.reset());

  it('should call repo.getAll with correct params', async () => {
    const mockedParams = mockParams();

    // ACT
    await sut.perform(mockedParams);

    // ASSERT
    expect(repo.getAll).toHaveBeenCalledTimes(1);
    expect(repo.getAll).toHaveBeenCalledWith(mockedParams);
  });

  it('should return correct response on success', async () => {
    // ACT
    const response = await sut.perform(mockParams());

    // ASSERT
    expect(response).toEqual([mockedShortUrl]);
  });
});
