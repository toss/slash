import { hexToRgba } from '.';

describe('utils.hexToRgba', () => {
  describe('hexToRgba', () => {
    test('#ffffff -> rgba(255,255,255,1)', () => {
      expect(hexToRgba('#ffffff')).toEqual('rgba(255,255,255,1)');
    });

    test('e3e3e3 -> rgba(227,227,227,1)', () => {
      expect(hexToRgba('#e3e3e3')).toEqual('rgba(227,227,227,1)');
    });

    test('#17171c -> rgba(23,23,28,1)', () => {
      expect(hexToRgba('#17171c')).toEqual('rgba(23,23,28,1)');
    });

    test('(#17171c, 0.5) -> rgba(23,23,28,0.5)', () => {
      expect(hexToRgba('#17171c', 0.5)).toEqual('rgba(23,23,28,0.5)');
    });

    test('Parses hex values correctly even without a "#" prefix.', () => {
      expect(hexToRgba('17171c')).toEqual('rgba(23,23,28,1)');
    });

    test('Throws an error for invalid alpha values.', () => {
      expect(() => hexToRgba('#ececec', 3)).toThrowError();
    });

    test('Throws an error for invalid hex values.', () => {
      // NaN
      expect(() => hexToRgba('#ecec1')).toThrowError();

      // Exceeding 255
      expect(() => hexToRgba('#ggaabb')).toThrowError();

      // Incorrect length
      expect(() => hexToRgba('e3e3e33')).toThrowError();

      // Incorrect length with '#'
      expect(() => hexToRgba('#e3e3e33')).toThrowError();

      // Short HEX format not supported
      expect(() => hexToRgba('#fff')).toThrowError();

      // Hex values with alpha channel not supported
      expect(() => hexToRgba('#ffffff80')).toThrowError();
    });
  });
});
