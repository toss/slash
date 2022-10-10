import { isServer } from './isServer';

/**
 * @name isMobileWeb
 * @description
 * Mobile Web 환경에서 실행된 JS 런타임인지 확인합니다.
 * ```typescript
 * isMobileWeb(): boolean;
 * ```
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
