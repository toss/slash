import { isAge } from './is-age';

describe('isAge', () => {
  it('should only be valid for natural numbers.', () => {
    const validInputs = ['123', '5', '1', '88'];
    const invalidInputs = ['0', '5.2', '-0', 'NaN', 'undefined', 'null', '5e+23', 'Infinity'];

    validInputs.forEach(ageInput => {
      expect(isAge(ageInput)).toBe(true);
    });

    invalidInputs.forEach(ageInput => {
      expect(isAge(ageInput)).toBe(false);
    });
  });
});
