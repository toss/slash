import { isServer } from './isServer';

/**
 * @name getOSByUserAgent
 * @description
 * User-Agent 문자열을 기반으로 OS를 반환합니다.
 *
 * - 반환하는 값:
 *   - `ios`: iOS 환경
 *   - `android`: Android 환경
 *   - `web`: 그 외의 브라우저 환경
 *   - `false`: 그 외의 서버 환경
 *
 * ```typescript
 * getOSByUserAgent(): false | 'ios' | 'android' | 'web';
 * ```
 */
export function getOSByUserAgent() {
  if (isServer()) {
    return false;
  }

  const isIos = window.navigator.userAgent.match(/ipad|iphone/i) !== null;

  if (isIos) {
    return 'ios';
  }

  const isAndroid = window.navigator.userAgent.match(/Android/i) !== null;

  if (isAndroid) {
    return 'android';
  }

  return 'web';
}
