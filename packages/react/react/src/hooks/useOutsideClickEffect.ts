import { isNotNil } from '@toss/utils';
import { useCallback, useEffect, useRef } from 'react';

type OneOrMore<T> = T | T[];

/** @tossdocs-ignore */
export function useOutsideClickEffect(container: OneOrMore<HTMLElement | null>, callback: () => void) {
  const containers = useRef<HTMLElement[]>([]);

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

      if (containers.current.some(x => x.contains(target as Node))) {
        return;
      }

      callback();
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });
}
