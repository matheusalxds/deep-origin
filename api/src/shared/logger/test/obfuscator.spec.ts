import { obfuscator } from '../obfuscator';

type Data = {
  cpf: string;
  name: string;
  nested: { cpf: string };
  emptyField: string;
};

describe('obfuscator', () => {
  it('should return correct data on success', async () => {
    // ARRANGE
    const data = {
      cpf: '123123123',
      name: 'any_name',
      fullName: 'any fullname',
      emptyField: '',
      nested: {
        cpf: '123123123',
      },
    };

    // ACT
    const resp = obfuscator<Data>(data, ['cpf', 'fullName']);

    // ASSERT
    expect(resp).toEqual({
      name: data.name,
      cpf: '123***',
      fullName: 'any*** ful***',
      nested: { cpf: '123***' },
      emptyField: '',
    });
  });

  it('should ignore null values', async () => {
    // ARRANGE
    const data = {
      cpf: null,
      name: undefined,
      fullName: 'any fullname',
      emptyField: '',
      nested: { cpf: '123123123' },
    };

    // ACT
    const resp = obfuscator<Data>(data, ['cpf', 'fullName']);

    // ASSERT
    expect(resp).toEqual({
      cpf: null,
      fullName: 'any*** ful***',
      nested: { cpf: '123***' },
      emptyField: '',
    });
  });
});
