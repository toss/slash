/** @tossdocs-ignore */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useLoading(): [boolean, <T>(promise: Promise<T>) => Promise<T>] {
  const [loading, setLoading] = useState(false);
  const ref = useIsMountedRef();

  const startTransition = useCallback(
    async <T>(promise: Promise<T>) => {
      try {
        setLoading(true);
        const data = await promise;
        return data;
      } finally {
        if (ref.isMounted) {
          setLoading(false);
        }
      }
    },
    [ref.isMounted]
  );

  return useMemo(() => [loading, startTransition], [loading, startTransition]);
}

function useIsMountedRef() {
  const ref = useRef({ isMounted: true }).current;

  useEffect(() => {
    ref.isMounted = true;
    return () => {
      ref.isMounted = false;
    };
  }, [ref]);

  return ref;
}
