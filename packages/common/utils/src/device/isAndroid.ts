import { isServer } from './isServer';

export function isAndroid() {
  if (isServer()) {
    return false;
  }

  return navigator.userAgent.match(/Android/i) != null;
}
