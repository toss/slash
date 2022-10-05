import { isServer } from './device/index';
import { getScrollYOffset } from './getScrollYOffset';

/**
 * @name getScrollDiffFromBottom
 * @description
 * 스크롤의 맨 아래까지 남은 픽셀의 숫자를 반환합니다.
 *
 * ```typescript
 * getScrollDiffFromBottom(): number
 * ```
 */
export function getScrollDiffFromBottom() {
  if (isServer() || !document.documentElement) {
    return 0;
  }

  const doc = document.documentElement;
  const body = document.body;
  const scrollTop = getScrollYOffset();
  const scrollBottom = scrollTop + doc.clientHeight;
  const scrollHeight = doc.scrollHeight || body.scrollHeight;
  return scrollHeight - scrollBottom;
}
