/** @tossdocs-ignore */
import { isServer } from './device/index';

type ViewportSize = Readonly<{ width: number; height: number }>;

export function getViewportSize(): ViewportSize {
  if (isServer()) {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
