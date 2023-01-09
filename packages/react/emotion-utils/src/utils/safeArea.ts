const safeAreaTop = '--toss-safe-area-top';
const safeAreaLeft = '--toss-safe-area-left';
const safeAreaRight = '--toss-safe-area-right';
const safeAreaBottom = '--toss-safe-area-bottom';

/**
 * @description 토스 웹뷰 환경에서 SafeArea 값을 사용하기 위한 유틸리티입니다.
 *
 * ```ts
 * const SafeArea: {
 *   Top: string;
 *   Left: string;
 *   Right: string;
 *   Bottom: string;
 * }
 * ```
 *
 * @example
 * console.log(SafeArea.Top) // 'var(--toss-safe-area-top, env(safe-area-inset-top, 0px))'
 */
export const SafeArea = {
  Top: `var(${safeAreaTop}, env(safe-area-inset-top, 0px))`,
  Left: `var(${safeAreaLeft}, env(safe-area-inset-left, 0px))`,
  Right: `var(${safeAreaRight}, env(safe-area-inset-right, 0px))`,
  Bottom: `var(${safeAreaBottom}, env(safe-area-inset-bottom, 0px))`,
};
