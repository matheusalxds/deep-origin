import { MockProxy, mock } from 'jest-mock-extended';
import * as MockDate from 'mockdate';
import { PinoLogger } from 'nestjs-pino';

import { CreateSlugUseCase, ICreateSlugUseCase } from '@/modules/short-url/application/create-slug.usecase';
import { IEnvService } from '@/shared/env/env.service';
import { UUIDAdapter } from '@/shared/id-generator/uuid.adapter';

describe('ICreateSlugUseCase', () => {
  let sut: ICreateSlugUseCase;
  let logger: MockProxy<PinoLogger>;
  let idGen: MockProxy<UUIDAdapter>;
  let envService: MockProxy<IEnvService>;
  const id = 'any_new_id';
  const slugUrl = 'http://localhost:3000';

  beforeEach(() => {
    MockDate.set(new Date());

    logger = mock();
    idGen = mock();
    idGen.gen.mockReturnValue(id);
    envService = mock();
    envService.get.mockReturnValue(slugUrl);

    sut = new CreateSlugUseCase(logger, idGen, envService);
  });

  afterAll(() => MockDate.reset());

  it('should return correct response on success', async () => {
    // ACT
    const response = sut.perform();

    // ASSERT
    expect(response).toEqual(`${slugUrl}/${id}`);
  });
});
