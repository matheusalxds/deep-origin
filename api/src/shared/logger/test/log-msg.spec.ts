import { msgEnd, msgStart } from '../log-msg';

const msgParams = ['ClassName', 'fnName'];
const msgData = { info: 'any_info' };

describe('LogMsg', () => {
  describe('msgStart', () => {
    it('should return correct msg and data', async () => {
      // ACT
      const response = msgStart(msgParams, msgData);

      // ASSERT
      expect(response).toEqual({ data: msgData, msg: 'ClassName - fnName - Start' });
    });

    it('should return only msg if data is not provided', async () => {
      // ARRANGE

      // ACT
      const response = msgStart(msgParams);

      // ASSERT
      expect(response).toEqual({ msg: 'ClassName - fnName - Start' });
    });
  });

  describe('msgEnd', () => {
    it('should return correct msg and data', async () => {
      // ARRANGE

      // ACT
      const response = msgEnd(msgParams, msgData);

      // ASSERT
      expect(response).toEqual({ data: msgData, msg: 'ClassName - fnName - End' });
    });

    it('should return only msg if data is not provided', async () => {
      // ARRANGE

      // ACT
      const response = msgStart(msgParams);

      // ASSERT
      expect(response).toEqual({ msg: 'ClassName - fnName - Start' });
    });
  });
});
