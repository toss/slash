import { MutableRefObject, Ref, RefCallback, useMemo } from 'react';

/**
 * @description 여러 개의 ref를 하나로 합치고 싶을 때 사용할 수 있는 hook입니다.
 *
 * ```ts
 * function useCombinedRefs<T>(...refs: Array<Ref<T>>): RefCallback<T> | null;
 * ```
 *
 * @example
 * const SomeComponent = forwardRef((props, parentRef) => {
 *   const myRef = useRef();
 *   const ref = useCombinedRefs(myRef, parentRef);
 *
 *   // 하단 div가 업데이트되면 myRef와 parentRef 모두가 업데이트됨
 *   return <div ref={ref} />;
 * })
 */
export function useCombinedRefs<T>(...refs: Array<Ref<T>>): RefCallback<T> | null {
  return useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null;
    }

    return (value: T) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value);
          return;
        }

        (ref as MutableRefObject<T>).current = value;
      }
    };
  }, [refs]);
}
