import { safeLocalStorage, safeSessionStorage } from '../storage';
import { TypedStorage, TypedStorageOptions, NumberTypedStorage } from './storages';

type Result<T> = T extends number ? NumberTypedStorage : TypedStorage<T>;

function createTypedStorage<T>(key: string, options: TypedStorageOptions<T> = {}): Result<T> {
  const { initialValue, ...others } = options;

  if (typeof initialValue === 'number') {
    return new NumberTypedStorage(key, { ...others, initialValue }) as any;
  }

  return new TypedStorage(key, options) as any;
}

/**
 * @name createTypedLocalStorage
 * @description Local Storage를 가리키는 TypedStorage를 생성합니다. initialValue를 이용해서 적절한 Type의 Storage를 반환합니다.
 *
 * @example
 * createTypedLocalStorage('obj', { initialValue: { foo: 'bar' } });
 * // => TypedStorage<{ foo: string }>
 *
 * createTypedLocalStorage('amount', { initialValue: 1000 });
 * // => NumberTypedStorage
 */
export function createTypedLocalStorage<T>(key: string, options: Omit<TypedStorageOptions<T>, 'storage'> = {}) {
  return createTypedStorage<T>(key, { ...options, storage: safeLocalStorage });
}

/**
 * @name createTypedSessionStorage
 * @description Session Storage를 가리키는 TypedStorage를 생성합니다. initialValue를 이용해서 적절한 Type의 Storage를 반환합니다.
 *
 * @example
 * createTypedSessionStorage('obj', { initialValue: { foo: 'bar' } });
 * // => TypedStorage<{ foo: string }>
 *
 * createTypedSessionStorage('amount', { initialValue: 1000 });
 * // => NumberTypedStorage
 */
export function createTypedSessionStorage<T>(key: string, options: Omit<TypedStorageOptions<T>, 'storage'> = {}) {
  return createTypedStorage<T>(key, { ...options, storage: safeSessionStorage });
}
