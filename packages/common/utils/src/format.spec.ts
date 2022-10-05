import { maskName } from '.';

describe('format', () => {
  describe('maskName', () => {
    const testCases = {
      허각: '허*',
      나토스: '나*스',
      남궁토스: '남**스',
      'NA TO SEU': 'N*******U',
    };

    for (const [testCase, expected] of Object.entries(testCases)) {
      it(`should mask '${testCase}' to '${expected}'`, () => {
        expect(maskName(testCase)).toEqual(expected);
      });
    }

    it(`should be able to mask the name with other masking character`, () => {
      expect(maskName('이토스', { maskChar: '+' })).toEqual('이+스');
    });
  });
});
