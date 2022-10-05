import { isHomePhone } from './is-home-phone';

describe('isHomePhone', () => {
  it('should return `true` if given value is valid', () => {
    expect(isHomePhone('021112222')).toEqual(true);
    expect(isHomePhone('0215994905')).toEqual(true);
    expect(isHomePhone('03115994905')).toEqual(true);
  });

  it('should return `false` if given value is not valid', () => {
    expect(isHomePhone('')).toEqual(false);
    expect(isHomePhone('01022223333')).toEqual(false);
  });
});
