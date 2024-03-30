import { useEffect, useMemo, useRef, useState } from 'react';
/** @tossdocs-ignore */
import { OverlayController, OverlayControlRef } from './OverlayController';
import { useOverlayContext } from './OverlayProvider';
import { CreateOverlayElement } from './types';

let elementId = 1;

interface Options {
  exitOnUnmount?: boolean;
}

export function useOverlay({ exitOnUnmount = true }: Options = {}) {
  const { mount, unmount } = useOverlayContext();
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
            // NOTE: state should be reset every time we open an overlay
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
      exit: () => {
        unmount(id);
      },
    }),
    [id, mount, unmount]
  );
}
