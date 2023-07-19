import { isNotNil } from '@toss/utils';
import { useCallback, useEffect, useRef } from 'react';

type OneOrMore<T> = T | T[];

/** @tossdocs-ignore */
export function useOutsideClickEffect(container: OneOrMore<React.RefObject<HTMLElement> | null>, callback: () => void) {
  const containers = useRef<Array<React.RefObject<HTMLElement>>>([]);

  useEffect(() => {
    containers.current = (Array.isArray(container) ? container : [container]).filter(isNotNil);
  }, [container]);

  const handleDocumentClick = useCallback(
    ({ target }: MouseEvent | TouchEvent) => {
      if (target === null) {
        return;
      }

      if (containers.current.length === 0) {
        return;
      }

      if (containers.current.some(x => x.current?.contains(target as Node))) {
        return;
      }

      callback();
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('touchstart', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('touchstart', handleDocumentClick);
    };
  });
}
