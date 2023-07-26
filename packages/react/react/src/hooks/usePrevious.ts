import { useEffect, useRef } from 'react';

/** @tossdocs-ignore */
export function usePrevious<T>(value: T, { defaultValue }: { defaultValue?: T } = {}): T {
  const ref = useRef<T>(defaultValue != null ? defaultValue : value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
