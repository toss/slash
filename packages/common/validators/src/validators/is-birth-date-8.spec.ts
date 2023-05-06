import { isBirthDate8 } from './is-birth-date-8';

describe('isBirthDate8', () => {
  it('should return `true` if given value is valid', () => {
    expect(isBirthDate8('19960729')).toEqual(true);
    expect(isBirthDate8('19961231')).toEqual(true);
    expect(isBirthDate8('20030101')).toEqual(true);
  });
  it('should return `false` if given value is not valid', () => {
    expect(isBirthDate8('960729')).toEqual(false);
    expect(isBirthDate8('foobar')).toEqual(false);
    expect(isBirthDate8('000000')).toEqual(false);
    expect(isBirthDate8('19960732')).toEqual(false);
    expect(isBirthDate8('30000730')).toEqual(false);
    expect(isBirthDate8('')).toEqual(false);
  });
});
