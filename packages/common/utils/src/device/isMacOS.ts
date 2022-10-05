import { isServer } from './isServer';

/**
 * @name isMacOS
 * @description
 * Mac OS 환경에서 실행된 JS 런타임인지 확인합니다.
 * ```typescript
 * isMacOS(): boolean;
 * ```
 */
export function isMacOS() {
  if (isServer()) {
    return false;
  }

  return navigator.platform.match(/Macintosh|MacIntel|MacPPC|Mac68K/) != null;
}
