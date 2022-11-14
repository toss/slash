/** @tossdocs-ignore */
import { createContext } from 'react';
import type { WindowScrollPosition } from '../types';

export const ScrollProgressContext = createContext<WindowScrollPosition | undefined>(undefined);
if (process.env.NODE_ENV !== 'production') {
  ScrollProgressContext.displayName = 'ScrollProgressContext';
}
