import { t } from '../t';

describe('T', () => {
  it('should return correct i18 file name', async () => {
    // ACT
    const response = t('path');

    // ASSERT
    expect(response).toBe('global.path');
  });
});
