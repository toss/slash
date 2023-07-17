import { noop } from '@toss/utils';
import { useCallback, useState } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

interface Options {
  onLoadComplete?: () => void;
  onLoadStart?: () => void;
}

/** @tossdocs-ignore */
export function useImageLoad(options?: Options) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onLoadStart = usePreservedCallback(options?.onLoadStart ?? noop);
  const onLoadComplete = usePreservedCallback(options?.onLoadComplete ?? noop);

  const registerLoadEventHandler = useCallback(
    (imgElement: HTMLImageElement) => {
      onLoadStart();

      if (imgElement.complete) {
        setIsLoaded(true);
        onLoadComplete();
        return;
      }

      imgElement.onload = () => {
        setIsLoaded(true);
        onLoadComplete();
      };
    },
    [onLoadStart, onLoadComplete]
  );

  const ref = useCallback(
    (node: HTMLImageElement) => {
      if (!node) {
        return;
      }
      registerLoadEventHandler(node);
    },
    [registerLoadEventHandler]
  );

  return { ref, isLoaded } as const;
}
