import { isMobileWeb, isNotNil } from '@toss/utils';
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
    if (isMobileWeb()) {
      document.addEventListener('touchstart', handleDocumentClick);
    } else {
      document.addEventListener('click', handleDocumentClick);
    }

    return () => {
      if (isMobileWeb()) {
        document.removeEventListener('touchstart', handleDocumentClick);
      } else {
        document.removeEventListener('click', handleDocumentClick);
      }
    };
  });
}
