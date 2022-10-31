/** @tossdocs-ignore */
import { isServer } from './isServer';

export function isIE() {
  if (isServer()) {
    return false;
  }

  return /MSIE|Trident/i.test(window.navigator.userAgent);
}
