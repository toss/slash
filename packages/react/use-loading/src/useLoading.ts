/** @tossdocs-ignore */
import { useCallback, useMemo, useState } from 'react';

export function useLoading(): [boolean, <T>(promise: Promise<T>) => Promise<T>] {
  const [loading, setLoading] = useState(false);
  const startTransition = useCallback(async <T>(promise: Promise<T>) => {
    try {
      setLoading(true);
      const data = await promise;
      return data;
    } finally {
      setLoading(false);
    }
  }, []);
  return useMemo(() => [loading, startTransition], [loading, startTransition]);
}
