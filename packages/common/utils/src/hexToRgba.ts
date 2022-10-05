function parseHexValueStr(str: string) {
  return parseInt(str, 16);
}

/**
 * @name isRGBDecimalValue
 * @description
 * 주어진 숫자가 RGB 색상 값의 범위인 0 ~ 255 사이의 값인지 확인합니다.
 * ```typescript
 * isRGBDecimalValue(value: number): boolean
 * ```
 * @example
 * isRGBDecimalValue(0) // true
 * isRGBDecimalValue(255) // true
 * isRGBDecimalValue(256) // false
 * isRGBDecimalValue(-1) // false
 */
export function isRGBDecimalValue(rgbDecimal: number) {
  return 0 <= rgbDecimal && rgbDecimal <= 255;
}

/**
 * @name isAlphaValue
 * @description
 * 주어진 숫자가 색상의 알파 값의 범위인 0 ~ 1 사이의 값인지 확인합니다.
 * ```typescript
 * isAlphaValue(value: number): boolean
 * ```
 * @example
 * isAlphaValue(0) // true
 * isAlphaValue(1) // true
 * isAlphaValue(1.1) // false
 * isAlphaValue(-0.1) // false
 * isAlphaValue(2) // false
 */
export function isAlphaValue(alpha: number) {
  return 0 <= alpha && alpha <= 1;
}

/**
 * @name hexToRgba
 * @description
 * 16진수 색상 값을 rgba 색상 값으로 변환합니다.
 * ```typescript
 * hexToRgba(hex: string, alpha?: number): string
 * ```
 * @example
 * hexToRgba('#000000') // 'rgba(0, 0, 0, 1)'
 * hexToRgba('#000000', 0.5) // 'rgba(0, 0, 0, 0.5)'
 * hexToRgba('#17171c') // 'rgba(23, 23, 28, 1)'
 * hexToRgba('17171c') // 'rgba(23, 23, 28, 1)'
 */
export function hexToRgba(hex: string, alpha = 1) {
  if (!isAlphaValue(alpha)) {
    throw new Error(`잘못된 알파값 입니다(0~1): ${alpha}`);
  }

  hex = hex.length === 7 ? hex.slice(1) : hex;

  const r = parseHexValueStr(hex.slice(0, 2));
  const g = parseHexValueStr(hex.slice(2, 4));
  const b = parseHexValueStr(hex.slice(4, 6));

  if ([r, g, b].some(x => Number.isNaN(x) || !isRGBDecimalValue(x))) {
    throw new Error(`잘못된 hex값 입니다.: ${hex}`);
  }

  return `rgba(${r},${g},${b},${alpha})`;
}
