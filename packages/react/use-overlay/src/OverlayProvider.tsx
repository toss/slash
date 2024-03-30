/** @tossdocs-ignore */
import { buildContext } from '@toss/react';
import React, { PropsWithChildren, useCallback, useState } from 'react';

export const [OverlayContextProvider, useOverlayContext] = buildContext<{
  mount(id: string, element: JSX.Element): void;
  unmount(id: string): void;
}>('OverlayContext', null);

export function OverlayProvider({ children }: PropsWithChildren) {
  const [overlayById, setOverlayById] = useState<Map<string, JSX.Element>>(new Map());

  const mount = useCallback((id: string, element: JSX.Element) => {
    setOverlayById(overlayById => {
      const cloned = new Map(overlayById);
      cloned.set(id, element);
      return cloned;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlayById(overlayById => {
      const cloned = new Map(overlayById);
      cloned.delete(id);
      return cloned;
    });
  }, []);

  const value = { mount, unmount };

  return (
    <OverlayContextProvider {...value}>
      {children}
      {[...overlayById.entries()].map(([id, element]) => (
        <React.Fragment key={id}>{element}</React.Fragment>
      ))}
    </OverlayContextProvider>
  );
}
