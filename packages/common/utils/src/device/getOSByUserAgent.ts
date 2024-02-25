/** @tossdocs-ignore */
import { isAndroid } from './isAndroid';
import { isIOS } from './isIOS';
import { isServer } from './isServer';

export function getOSByUserAgent() {
  if (isServer()) {
    return false;
  }

  if (isIOS()) {
    return 'ios';
  }

  if (isAndroid) {
    return 'android';
  }

  return 'web';
}
