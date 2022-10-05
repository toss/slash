import { isServer } from './isServer';

/**
 * @name isMobileWeb
 * @description
 * 현재 JS 런타임
 */
export function isMobileWeb() {
  if (isServer()) {
    return false;
  }

  if (navigator.userAgent.match(/ipad|iphone/i) !== null || navigator.userAgent.match(/Android/i) !== null) {
    return true;
  }
  return false;
}
