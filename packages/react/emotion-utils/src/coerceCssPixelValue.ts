/** @tossdocs-ignore */
import { CSSPixelValue } from './types';

export function coerceCssPixelValue(value: CSSPixelValue): string {
  return typeof value === 'string' ? value : `${value}px`;
}
