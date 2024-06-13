import { MutableRefObject, Ref, useCallback } from 'react';

type CallbackRef<T> = (ref: T | null) => void;

/** @tossdocs-ignore */
export function useCombinedRefs<T>(...refs: Array<Ref<T> | CallbackRef<T>>): Ref<T> {
  return useCallback(
    (value: T) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref != null) {
          (ref as MutableRefObject<T>).current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
