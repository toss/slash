/** @tossdocs-ignore */
import { isServer } from './isServer';

export function isIOS() {
  if (isServer()) {
    return false;
  }

  return (
    navigator.userAgent.match(/iPad|iPhone/i) !== null ||
    (navigator.userAgent.match(/Macintosh|Intel Mac/i) !== null &&
      navigator.maxTouchPoints > 0 &&
      window.screen.availWidth >= 375 &&
      window.screen.availWidth <= 1366)
  );
}
