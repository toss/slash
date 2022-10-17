import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { OverlayContext } from './OverlayProvider';
/** @tossdocs-ignore */
import { OverlayController, OverlayControlRef } from './OverlayController';
import { CreateOverlayElement } from './types';

let elementId = 1;

interface Options {
  exitOnUnmount?: boolean;
}

export function useOverlay({ exitOnUnmount = true }: Options = {}) {
  const context = useContext(OverlayContext);

  if (context == null) {
    throw new Error('useOverlay는 OverlayProvider 안에서만 사용 가능합니다.');
  }

  const { mount, unmount } = context;
  const [id] = useState(() => String(elementId++));

  const overlayRef = useRef<OverlayControlRef | null>(null);

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        unmount(id);
      }
    };
  }, [exitOnUnmount, id, unmount]);

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onExit={() => {
              unmount(id);
            }}
          />
        );
      },
      close: () => {
        overlayRef.current?.close();
      },
    }),
    [id, mount, unmount]
  );
}
