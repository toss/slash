import { generateStorage } from '@toss/storage';
import { useMemo, useState } from 'react';
import { useVisibilityEvent } from './useVisibilityEvent';

const storage = generateStorage();

/** @tossdocs-ignore */
export function useLocalStorageChangeDetector(key: string) {
  const [value, setValue] = useState(storage.get(key));

  useVisibilityEvent(state => {
    if (state !== 'visible') {
      return;
    }

    const v = storage.get(key);
    setValue(v);
  });

  const utils = useMemo(() => {
    return {
      clearStorage: () => storage.remove(key),
    };
  }, [key]);

  return [value, utils] as const;
}
