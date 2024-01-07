import { asyncNoop, noop } from '.';

describe('noop functions', () => {
  describe('noop', () => {
    it('should return undefined', () => {
      expect(noop()).toBeUndefined();
    });
  });

  describe('asyncNoop', () => {
    it('should return Promise', () => {
      expect(asyncNoop()).toEqual(expect.any(Promise));
    });
  });
});
