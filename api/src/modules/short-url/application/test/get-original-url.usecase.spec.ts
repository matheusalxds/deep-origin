import { MockProxy, mock } from 'jest-mock-extended';
import { PinoLogger } from 'nestjs-pino';

import {
  GetOriginalUrlUseCase,
  IGetOriginalUrlUseCase,
} from '@/modules/short-url/application/get-original-url.usecase';
import { mockShortUrl } from '@/modules/short-url/domain/test/mock/short-url.mock';
import { IShortUrlRepo } from '@/modules/short-url/infra/repo/short-url.repo';
import { Pagination } from '@/shared/graphql/types/pagination';

const mockParams = (): string => 'any_original_ur';

describe('GetOriginalUrlUseCase', () => {
  let sut: IGetOriginalUrlUseCase;
  let logger: MockProxy<PinoLogger>;
  let repo: MockProxy<IShortUrlRepo>;
  const mockedShortUrl = [mockShortUrl()];

  beforeEach(() => {
    logger = mock();
    repo = mock();
    repo.getAll.mockResolvedValue(mockedShortUrl);

    sut = new GetOriginalUrlUseCase(logger, repo);
  });

  it('should call repo.getAll with correct params', async () => {
    const mockedParams = mockParams();

    // ACT
    await sut.perform(mockedParams);

    // ASSERT
    expect(repo.getAll).toHaveBeenCalledTimes(1);
    expect(repo.getAll).toHaveBeenCalledWith({ pagination: new Pagination(), filter: { shortUrl: mockedParams } });
  });

  it('should return correct response on success', async () => {
    // ACT
    const response = await sut.perform(mockParams());

    // ASSERT
    expect(response).toEqual(mockedShortUrl[0].originalUrl);
  });
});
