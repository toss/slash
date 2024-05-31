import { isNotNil } from '@toss/utils';
import { useEffect, useRef } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

type OneOrMore<T> = T | T[];

/** @tossdocs-ignore */
export function useOutsideClickEffect(container: OneOrMore<HTMLElement | null>, callback: () => void) {
  const containers = useRef<HTMLElement[]>([]);


  const handleDocumentClick = usePreservedCallback(({ target }: MouseEvent | TouchEvent) => {
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
  });

  useEffect(() => {
    containers.current = [container].flat(1).filter(isNotNil);
  }, [container]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('touchstart', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('touchstart', handleDocumentClick);
    };
  }, [handleDocumentClick]);
}
