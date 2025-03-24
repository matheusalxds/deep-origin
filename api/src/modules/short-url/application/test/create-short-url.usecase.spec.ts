import { MockProxy, mock } from 'jest-mock-extended';
import * as MockDate from 'mockdate';
import { PinoLogger } from 'nestjs-pino';

import {
  CreateShortUrlUseCase,
  ICreateShortUrlUseCase,
} from '@/modules/short-url/application/create-short-url.usecase';
import { ICreateSlugUseCase } from '@/modules/short-url/application/create-slug.usecase';
import { mockShortUrl } from '@/modules/short-url/domain/test/mock/short-url.mock';
import { IShortUrlRepo } from '@/modules/short-url/infra/repo/short-url.repo';
import { CreateShortUrl } from '@/modules/short-url/presentation/graphlq/types/short-url';
import { UUIDAdapter } from '@/shared/id-generator/uuid.adapter';

const mockParams = (): CreateShortUrl => ({
  originalUrl: 'any_original_ur',
});

describe('CreateShortUrlUseCase', () => {
  let sut: ICreateShortUrlUseCase;
  let logger: MockProxy<PinoLogger>;
  let repo: MockProxy<IShortUrlRepo>;
  let idGen: MockProxy<UUIDAdapter>;
  let genSlug: MockProxy<ICreateSlugUseCase>;
  const id = 'any_new_id';
  const slug = 'any_slug';
  const mockedShortUrl = mockShortUrl();

  beforeEach(() => {
    MockDate.set(new Date());

    logger = mock();
    repo = mock();
    repo.create.mockResolvedValue(mockedShortUrl);
    idGen = mock();
    idGen.gen.mockReturnValue(id);
    genSlug = mock();
    genSlug.perform.mockReturnValue(slug);

    sut = new CreateShortUrlUseCase(logger, repo, idGen, genSlug);
  });

  afterAll(() => MockDate.reset());

  it('should call idGen.gen once', async () => {
    const mockedParams = mockParams();

    // ACT
    await sut.perform(mockedParams);

    // ASSERT
    expect(idGen.gen).toHaveBeenCalledTimes(1);
  });

  it('should call repo.create with correct params', async () => {
    const mockedParams = mockParams();

    // ACT
    await sut.perform(mockedParams);

    // ASSERT
    expect(repo.create).toHaveBeenCalledTimes(1);
    expect(repo.create).toHaveBeenCalledWith({
      id,
      originalUrl: mockedParams.originalUrl,
      createdAt: new Date(),
      shortUrl: slug,
    });
  });

  it('should return correct response on success', async () => {
    // ACT
    const response = await sut.perform(mockParams());

    // ASSERT
    expect(response).toEqual(mockedShortUrl);
  });
});
