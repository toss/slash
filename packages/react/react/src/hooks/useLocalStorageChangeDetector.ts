import { generateStorage } from '@toss/storage';
import { useMemo, useState } from 'react';
import { useVisibilityEvent } from './useVisibilityEvent';

const storage = generateStorage();

/**
 * @description
 * 브라우저 탭의 컨텐츠가 visible 일 때 업데이트 되는 localStorage 값을 가져옵니다.
 *
 * ```ts
 * // key: LocalStorage 값을 가져올 때 사용할 Key
 * const [value, { clearStorage }] = useLocalStorageChangeDetector(key);
 * ```
 *
 * @example
 * const [deviceWasRegistered, { clearStorage }] = useLocalStorageChangeDetector('deviceWasRegistered');
 *
 * useEffect(() => {
 *   if (deviceWasRegistered !== null) {
 *     tossAppBridge.showToast('기기가 정상적으로 등록되었습니다.');
 *     fetchDeviceList();
 *     clearStorage();
 *   }
 * }, [deviceWasRegistered])
 */
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
