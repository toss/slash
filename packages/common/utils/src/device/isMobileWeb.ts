/** @tossdocs-ignore */
import { isServer } from './isServer';

export function isMobileWeb() {
  if (isServer()) {
    return false;
  }

  if (navigator.userAgent.match(/ipad|iphone/i) !== null || navigator.userAgent.match(/Android/i) !== null) {
    return true;
  }
  return false;
}
