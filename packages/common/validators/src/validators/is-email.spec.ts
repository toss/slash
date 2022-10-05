import { isEmail } from './is-email';

describe('isEmail', () => {
  it('should return `true` if given value is valid', () => {
    expect(isEmail('hyeonsu@toss.im')).toEqual(true);
  });

  it('should return `false` if given value is not valid', () => {
    expect(isEmail('')).toEqual(false);
    expect(isEmail('hyeonsu')).toEqual(false);
    expect(isEmail('1234')).toEqual(false);
    expect(isEmail('hyeonsu@')).toEqual(false);
    expect(isEmail('hyeonsu@toss')).toEqual(false);
    expect(isEmail('hyeonsu@toss.')).toEqual(false);
    expect(isEmail('hyeonsu@toss.123')).toEqual(false);
    expect(isEmail('hyeonsu@toss.com123')).toEqual(false);
  });
});
