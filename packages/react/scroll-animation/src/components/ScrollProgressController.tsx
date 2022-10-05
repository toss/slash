/** @tossdocs-ignore */
import { ReactNode } from 'react';
import { ScrollProgressContext } from '../contexts';
import { useWindowScrollPosition } from '../hooks';

interface Props {
  children?: ReactNode;
}

export function ScrollProgressController({ children }: Props) {
  const windowScrollPosition = useWindowScrollPosition();

  return <ScrollProgressContext.Provider value={windowScrollPosition}>{children}</ScrollProgressContext.Provider>;
}
