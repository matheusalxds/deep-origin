import { MockProxy, mock } from 'jest-mock-extended';
import { PinoLogger } from 'nestjs-pino';

import { IUpdateSlugUseCase, UpdateSlugUseCase } from '@/modules/short-url/application/update-slug.usecase';
import { IShortUrlRepo } from '@/modules/short-url/infra/repo/short-url.repo';
import { IEnvService } from '@/shared/env/env.service';

describe('IUpdateSlugUseCase', () => {
  let sut: IUpdateSlugUseCase;
  let logger: MockProxy<PinoLogger>;
  let repo: MockProxy<IShortUrlRepo>;
  let envService: MockProxy<IEnvService>;
  const id = 'any_new_id';
  const newSlug = 'any_new_slug';
  const slugUrl = 'http://localhost:3000';

  beforeEach(() => {
    logger = mock();
    repo = mock();
    repo.update.mockResolvedValue(true);
    envService = mock();
    envService.get.mockReturnValue(slugUrl);

    sut = new UpdateSlugUseCase(logger, envService, repo);
  });

  it('should call envService.get with correct params', async () => {
    // ACT
    await sut.perform(id, newSlug);

    // ASSERT
    expect(envService.get).toHaveBeenCalledTimes(1);
    expect(envService.get).toHaveBeenCalledWith('SLUG_URL');
  });

  it('should call repo.update with correct params', async () => {
    // ACT
    await sut.perform(id, newSlug);

    // ASSERT
    expect(repo.update).toHaveBeenCalledTimes(1);
    expect(repo.update).toHaveBeenCalledWith(id, `${slugUrl}/${newSlug}`);
  });

  it('should return correct response', async () => {
    // ACT
    const response = await sut.perform(id, newSlug);

    // ASSERT
    expect(response).toBe(true);
  });
});
