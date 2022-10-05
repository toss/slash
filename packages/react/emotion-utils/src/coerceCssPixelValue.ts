/**
 * @name coerceCssPixelValue
 * @description CSS value를 string value로 변경합니다.
 *
 * @example
 * coerceCssPixelValue(4);
 * // => '4px'
 *
 * coerceCssPixelValue('100%');
 * // => '100%'
 *
 * coerceCssPixelValue('4px');
 * // => '4px'
 */
export function coerceCssPixelValue(value: string | number): string {
  return typeof value === 'string' ? value : `${value}px`;
}
