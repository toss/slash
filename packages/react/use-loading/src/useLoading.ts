/** @tossdocs-ignore */
import { useIsMountedRef } from '@toss/react';
import { useCallback, useMemo, useState } from 'react';

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
