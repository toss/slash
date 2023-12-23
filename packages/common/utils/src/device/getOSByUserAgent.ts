/** @tossdocs-ignore */
import { isIOS } from './isIOS';
import { isServer } from './isServer';

export function getOSByUserAgent() {
  if (isServer()) {
    return false;
  }

  if (isIOS()) {
    return 'ios';
  }

  const isAndroid = window.navigator.userAgent.match(/Android/i) !== null;

  if (isAndroid) {
    return 'android';
  }

  return 'web';
}
