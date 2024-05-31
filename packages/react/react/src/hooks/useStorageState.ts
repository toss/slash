/** @tossdocs-ignore */
import { safeLocalStorage, Storage } from '@toss/storage';
import { SetStateAction, useCallback, useEffect, useState } from 'react';

type ToPrimitive<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : never;
type ToObject<T> = T extends unknown[] | Record<string, unknown> ? T : never;

export type Serializable<T> = T extends string | number | boolean ? ToPrimitive<T> : ToObject<T>;

interface StorageStateOptions<T> {
  storage?: Storage;
  defaultValue?: Serializable<T>;
}

interface StorageStateOptionsWithDefaultValue<T> extends StorageStateOptions<T> {
  defaultValue: Serializable<T>;
}

/**
 * 스토리지에 상태값을 저장하고 불러와서 값이 보존되는 useState로 동작하는 hook입니다.
 * @param key 스토리지에 저장할 키
 */
export function useStorageState<T>(
  key: string
): readonly [Serializable<T> | undefined, (value: SetStateAction<Serializable<T> | undefined>) => void, () => void];
export function useStorageState<T>(
  key: string,
  { storage, defaultValue }: StorageStateOptionsWithDefaultValue<T>
): readonly [Serializable<T>, (value: SetStateAction<Serializable<T>>) => void, () => void];
export function useStorageState<T>(
  key: string,
  { storage, defaultValue }: StorageStateOptions<T>
): readonly [Serializable<T> | undefined, (value: SetStateAction<Serializable<T> | undefined>) => void, () => void];
export function useStorageState<T>(
  key: string,
  { storage = safeLocalStorage, defaultValue }: StorageStateOptions<T> = {}
): readonly [Serializable<T> | undefined, (value: SetStateAction<Serializable<T> | undefined>) => void, () => void] {
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

  useStorageEvent(key, () => {
    setState(getValue);
  });

  const [state, setState] = useState<Serializable<T> | undefined>(getValue);

  const set = useCallback(
    (value: SetStateAction<Serializable<T> | undefined>) => {
      setState(curr => {
        const nextValue = typeof value === 'function' ? value(curr) : value;

        if (nextValue == null) {
          storage.remove(key);
        } else {
          storage.set(key, JSON.stringify(nextValue));
        }

        window.dispatchEvent(
          new StorageEvent('storage', {
            key,
            newValue: JSON.stringify(nextValue),
          })
        );

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

function useStorageEvent(key: string, callback: () => void) {
  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  }, [key, callback]);
}
