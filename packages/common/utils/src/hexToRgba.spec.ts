import { hexToRgba } from '.';

describe('utils.hexToRgba', () => {
  describe('hexToRgba', () => {
    test('#ffffff -> rgba(255,255,255,1)', () => {
      expect(hexToRgba('#ffffff')).toEqual('rgba(255,255,255,1)');
    });

    test('#17171c -> rgba(23,23,28,1)', () => {
      expect(hexToRgba('#17171c')).toEqual('rgba(23,23,28,1)');
    });

    test('(#17171c, 0.5) -> rgba(23,23,28,0.5)', () => {
      expect(hexToRgba('#17171c', 0.5)).toEqual('rgba(23,23,28,0.5)');
    });

    test('hex값 앞에 "#"을 붙이지 않아도 잘 파싱한다.', () => {
      expect(hexToRgba('17171c')).toEqual('rgba(23,23,28,1)');
    });

    test('잘못된 alpha 값인 경우 오류를 발생시킨다.', () => {
      expect(() => hexToRgba('#ececec', 3)).toThrowError();
    });

    test('잘못된 hex 값인 경우 오류를 발생시킨다.', () => {
      // NaN
      expect(() => hexToRgba('#ecec1')).toThrowError();

      // 255 초과
      expect(() => hexToRgba('#ggaabb')).toThrowError();
    });
  });
});
