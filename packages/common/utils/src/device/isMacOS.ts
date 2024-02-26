/** @tossdocs-ignore */
import { isServer } from './isServer';

export const isMacOS = (function () {
  if (isServer) {
    return false;
  }

  return navigator.platform.match(/Macintosh|MacIntel|MacPPC|Mac68K/) != null;
})();
