import { generateStorage } from '@toss/storage';
import { useMemo, useState } from 'react';
import { useDocumentVisibilityChange } from './useDocumentVisibilityChange';

const storage = generateStorage();

/** @tossdocs-ignore */
export function useLocalStorageChangeDetector(key: string) {
  const [value, setValue] = useState(storage.get(key));

  useDocumentVisibilityChange(isVisible => {
    if (!isVisible) {
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
