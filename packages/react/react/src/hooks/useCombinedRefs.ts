import { MutableRefObject, Ref, RefCallback, useCallback } from 'react';

/**
 * @description 여러 개의 ref를 하나로 합치고 싶을 때 사용할 수 있는 hook입니다.
 *
 * ```ts
 * function useCombinedRefs<T>(...refs: Array<Ref<T>>): RefCallback<T>;
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
export const useCombinedRefs = <T>(...refs: Array<Ref<T>>): RefCallback<T> =>
  useCallback(
    (value: T) =>
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref != null) {
          (ref as MutableRefObject<T>).current = value;
        }
      }),
    [refs]
  );
