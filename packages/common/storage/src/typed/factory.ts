/** @tossdocs-ignore */
import { safeLocalStorage, safeSessionStorage } from '../storage';
import { NumberTypedStorage, TypedStorage, TypedStorageOptions } from './storages';

type Result<T> = T extends number ? NumberTypedStorage : TypedStorage<T>;

function createTypedStorage<T>(key: string, options: TypedStorageOptions<T> = {}): Result<T> {
  const { initialValue, ...others } = options;

  if (typeof initialValue === 'number') {
    return new NumberTypedStorage(key, { ...others, initialValue }) as any;
  }

  return new TypedStorage(key, options) as any;
}

export function createTypedLocalStorage<T>(key: string, options: Omit<TypedStorageOptions<T>, 'storage'> = {}) {
  return createTypedStorage<T>(key, { ...options, storage: safeLocalStorage });
}

export function createTypedSessionStorage<T>(key: string, options: Omit<TypedStorageOptions<T>, 'storage'> = {}) {
  return createTypedStorage<T>(key, { ...options, storage: safeSessionStorage });
}
