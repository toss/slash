import { isServer } from './isServer';

export const isIOS = (function () {
  if (isServer()) {
    return false;
  }

  return navigator.userAgent.match(/ipad|iphone/i) != null;
})();
