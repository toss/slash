import { isNotNil } from '@toss/utils';
import { useCallback, useEffect, useRef } from 'react';

type OneOrMore<T> = T | T[];

/**
 * @description
 * 입력한 컨테이너 밖의 요소에서 클릭 이벤트가 발생하였을때 콜백을 호출합니다.
 *
 * ### 사용 예시 1
 * ```ts
 * const ref = useRef<HTMLElement>(null);
 *
 * useOutsideClickEffect(ref, () => {
 *   console.log('outside clicked!');
 * });
 * ```
 *
 * ### 사용 예시 2
 * ```ts
 * const ref1 = useRef<HTMLElement>(null);
 * const ref2 = useRef<HTMLElement>(null);
 *
 * useOutsideClickEffect([ref1, ref2], () => {
 *   console.log('outside clicked!');
 * });
 * ```
 */
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
    document.addEventListener('touchstart', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('touchstart', handleDocumentClick);
    };
  });
}
