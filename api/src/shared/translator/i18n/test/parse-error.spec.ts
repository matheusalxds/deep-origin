import { parseError } from '../parse-error';

describe('parseError', () => {
  it('should return correct response', async () => {
    // ARRANGE
    const source = 'any_path';
    const internal = 'ABC';

    // ACT
    const response = parseError({ source, internal });

    // ASSERT
    expect(response).toEqual({ source, internal });
  });

  it('should return args if args are provided', async () => {
    // ARRANGE
    const source = 'any_path';
    const internal = 'ABC';
    const args = { argX: 'test' };

    // ACT
    const response = parseError({ source, internal, args });

    // ASSERT
    expect(response).toEqual({ source, internal, args });
  });

  it('should return stackTrace if stackTrace is provided', async () => {
    // ARRANGE
    const source = 'any_path';
    const internal = 'ABC';
    const stackTrace = new Error('any_error');

    // ACT
    const response = parseError({ source, internal, stackTrace });

    // ASSERT
    expect(response).toEqual({ source, internal, stackTrace });
  });
});
