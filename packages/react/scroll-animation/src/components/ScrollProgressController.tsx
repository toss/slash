/** @tossdocs-ignore */
import { PropsWithChildren } from 'react';
import { ScrollProgressContext } from '../contexts';
import { useWindowScrollPosition } from '../hooks';

export function ScrollProgressController({ children }: PropsWithChildren) {
  const windowScrollPosition = useWindowScrollPosition();

  return <ScrollProgressContext.Provider value={windowScrollPosition}>{children}</ScrollProgressContext.Provider>;
}
