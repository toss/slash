import { getScrollYOffset } from './getScrollYOffset';
import { isServer } from './device/index';

/**
 * @name getScrollPercent
 * @description
 * 현재 스크롤된 퍼센티지를 나타냅니다.
 * ```typescript
 * getScrollPercent(): number
 * ```
 *
 * @example
 * getScrollPercent() // 50.2
 */
export function getScrollPercent() {
  if (isServer() || !document.documentElement) {
    return 0;
  }

  const doc = document.documentElement;
  const body = document.body;
  const scrollTop = getScrollYOffset();
  const scrollHeight = (doc.scrollHeight || body.scrollHeight) - doc.clientHeight;
  return (scrollTop / scrollHeight) * 100;
}
