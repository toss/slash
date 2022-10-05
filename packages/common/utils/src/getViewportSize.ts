import { isServer } from './device/index';

type ViewportSize = Readonly<{ width: number; height: number }>;

/**
 * @name getViewportSize
 * @description
 * 현재 뷰포트의 크기를 반환합니다.
 * ```typescript
 * getViewportSize(): { width: number; height: number }
 * ```
 */
export function getViewportSize(): ViewportSize {
  if (isServer()) {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
