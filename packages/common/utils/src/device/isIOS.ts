import { isServer } from './isServer';

export function isIOS() {
  if (isServer()) {
    return false;
  }

  return navigator.userAgent.match(/ipad|iphone/i) != null;
}
