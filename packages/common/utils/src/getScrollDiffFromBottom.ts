/** @tossdocs-ignore */
import { isServer } from './device/index';
import { getScrollYOffset } from './getScrollYOffset';

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
