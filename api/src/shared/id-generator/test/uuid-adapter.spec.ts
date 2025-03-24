import { mocked } from 'jest-mock';
import { v4 } from 'uuid';

import { UUIDAdapter } from '@/shared/id-generator/uuid.adapter';

jest.mock('uuid');

describe('UUID Adapter', () => {
  let idGenerator: UUIDAdapter;

  beforeAll(() => {
    idGenerator = new UUIDAdapter();
    mocked(v4).mockReturnValue('uuid');
  });

  it('should call v4', async () => {
    // ACT
    idGenerator.gen();

    // ASSERT
    expect(v4).toHaveBeenCalled();
    expect(v4).toHaveBeenCalledTimes(1);
  });

  it('should return a random id', async () => {
    // ACT
    const generated = idGenerator.gen();

    // ASSERT
    expect(generated).toBe('uuid');
  });
});
