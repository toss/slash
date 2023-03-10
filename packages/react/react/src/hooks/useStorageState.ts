/** @tossdocs-ignore */
import { safeLocalStorage, Storage } from '@toss/storage';
import { SetStateAction, useCallback, useState } from 'react';

export type Serializable = string | number | boolean | unknown[] | Record<string, unknown>;
interface StorageStateOptions<T> {
  storage?: Storage;
  defaultValue?: T;
}

interface StorageStateOptionsWithDefaultValue<T> extends StorageStateOptions<T> {
  defaultValue: T;
}

/**
 * 스토리지에 상태값을 저장하고 불러와서 값이 보존되는 useState로 동작하는 hook입니다.
 * @param key 스토리지에 저장할 키
 */
export function useStorageState<T extends Serializable>(
  key: string
): readonly [T | undefined, (value: SetStateAction<T | undefined>) => void, () => void];
export function useStorageState<T>(
  key: string,
  { storage, defaultValue }: StorageStateOptionsWithDefaultValue<T>
): readonly [T, (value: SetStateAction<T>) => void, () => void];
export function useStorageState<T>(
  key: string,
  { storage, defaultValue }: StorageStateOptions<T>
): readonly [T | undefined, (value: SetStateAction<T | undefined>) => void, () => void];
export function useStorageState<T>(
  key: string,
  { storage = safeLocalStorage, defaultValue }: StorageStateOptions<T> = {}
): readonly [T | undefined, (value: SetStateAction<T | undefined>) => void, () => void] {
  const getValue = useCallback(<T>() => {
    const data = storage.get(key);

    if (data == null) {
      return defaultValue;
    }

    try {
      const result = JSON.parse(data);

      if (result == null) {
        return defaultValue;
      }

      return result as T;
    } catch {
      // NOTE: JSON 객체가 아닌 경우
      return defaultValue;
    }
  }, [defaultValue, key, storage]);

  const [state, setState] = useState<T | undefined>(getValue);

  const set = useCallback(
    (value: SetStateAction<T | undefined>) => {
      setState(curr => {
        const nextValue = value instanceof Function ? value(curr) : value;

        if (nextValue == null) {
          storage.remove(key);
        } else {
          storage.set(key, JSON.stringify(nextValue));
        }

        return nextValue;
      });
    },
    [key, storage]
  );

  const refresh = useCallback(() => {
    setState(getValue() ?? defaultValue);
  }, [defaultValue, getValue]);

  return [state, set, refresh] as const;
}
