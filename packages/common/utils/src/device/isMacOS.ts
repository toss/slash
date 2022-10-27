/** @tossdocs-ignore */
import { isServer } from './isServer';

export function isMacOS() {
  if (isServer()) {
    return false;
  }

  return navigator.platform.match(/Macintosh|MacIntel|MacPPC|Mac68K/) != null;
}
