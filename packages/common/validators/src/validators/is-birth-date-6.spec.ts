import { isBirthDate6 } from './is-birth-date-6';

describe('isBirthDate6', () => {
  it('should return `true` if given value is valid', () => {
    expect(isBirthDate6('960729')).toEqual(true);
    expect(isBirthDate6('961231')).toEqual(true);
    expect(isBirthDate6('000101')).toEqual(true);
  });
  it('should return `false` if given value is not valid', () => {
    expect(isBirthDate6('19960729')).toEqual(false);
    expect(isBirthDate6('foobar')).toEqual(false);
    expect(isBirthDate6('000000')).toEqual(false);
    expect(isBirthDate6('960732')).toEqual(false);
    expect(isBirthDate6('951301')).toEqual(false);
    expect(isBirthDate6('950231')).toEqual(false);
    expect(isBirthDate6('')).toEqual(false);
  });
});
