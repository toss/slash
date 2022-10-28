/** @tossdocs-ignore */
import { isServer } from './device/index';
import { getScrollYOffset } from './getScrollYOffset';

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
