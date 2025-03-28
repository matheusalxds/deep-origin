import { ConfigService } from '@nestjs/config';
import { mock } from 'jest-mock-extended';

import { EnvService } from './env.service';

describe('EnvService', () => {
  let service: EnvService;
  const configService = mock<ConfigService>();

  beforeEach(async () => {
    service = new EnvService(configService);
  });

  it('should call configService with correct params', () => {
    // ACT
    service.get('NODE_ENV');

    // ASSERT
    expect(configService.get).toHaveBeenCalledTimes(1);
  });
});
