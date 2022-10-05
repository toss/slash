/** @tossdocs-ignore */
import { useCallback, useState } from 'react';
import type { WindowScrollPosition } from '../types';
import { useScrollEventListener } from './useScrollEventListener';

export function useWindowScrollPosition(): WindowScrollPosition {
  const [windowScrollPosition, setWindowScrollPosition] = useState<WindowScrollPosition>({
    width: 480,
    height: 800,
    scrollX: 0,
    scrollY: 0,
  });

  const updateWindowScrollPosition = useCallback(() => {
    setWindowScrollPosition({
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    });
  }, []);

  useScrollEventListener(updateWindowScrollPosition);

  return windowScrollPosition;
}
