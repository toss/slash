import { isServer } from './isServer';

/**
 * @name isIE
 * @description
 * Internet Explorer 환경에서 실행된 JS 런타임인지 확인합니다.
 * ```typescript
 * isIE(): boolean;
 * ```
 */
export function isIE() {
  if (isServer()) {
    return false;
  }

  return /MSIE|Trident/i.test(window.navigator.userAgent);
}
