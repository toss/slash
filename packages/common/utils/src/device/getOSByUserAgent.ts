/** @tossdocs-ignore */
import { isServer } from './isServer';

export function getOSByUserAgent() {
  if (isServer()) {
    return false;
  }

  const isIos = window.navigator.userAgent.match(/ipad|iphone/i) !== null;

  if (isIos) {
    return 'ios';
  }

  const isAndroid = window.navigator.userAgent.match(/Android/i) !== null;

  if (isAndroid) {
    return 'android';
  }

  return 'web';
}
