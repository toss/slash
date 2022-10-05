import { isAge } from './is-age';

describe('isAge', () => {
  test('자연수만 유효하다.', () => {
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
