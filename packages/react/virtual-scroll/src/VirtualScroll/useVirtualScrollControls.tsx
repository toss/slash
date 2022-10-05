/** @tossdocs-ignore */
import { createContext, useContext } from 'react';

interface Context {
  isOpen: boolean;
  toggleOpen: () => void;
  nestedLevel: number;
  height: number;
  resize: (size: number) => void;
}

/**
 * @deprecated v18에서 제거 예정
 */
export const VirtualScrollContext = createContext<Context | null>(null);

/**
 * @deprecated v18에서 제거 예정
 */
export function useVirtualScrollControls() {
  const context = useContext(VirtualScrollContext);

  if (context == null) {
    throw new Error('VirtualScroll의 Group에서만 사용할 수 있습니다.');
  }

  return context;
}
