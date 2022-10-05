import { safeLocalStorage, Storage } from '../../storage';

export interface TypedStorageOptions<T> {
  storage?: Storage;
  initialValue?: T;
}

/**
 * @name TypedStorage
 * @description Web Storage를 사용할 때 반복적으로 작성되는 로직을 추상화하고, fully-typed 형태로 사용하기 위해 만들어졌습니다.
 *
 * @example
 * // #1
 * import { TypedStorage } from '@toss/storage/typed';
 * type Gender = 'men' | 'women';
 * const count = new TypedStorage<Gender>('gender', { initialValue: 'men' });
 * count.get(); // 'men'
 * count.set('women'); // 'women'
 * count.set('not-gender-string'); // Type Error
 *
 * // #2
 * import { TypedStorage } from '@toss/storage/typed';
 *
 * const count = new TypedStorage('count', { initialValue: 0 });
 * count.get(); // 0
 * count.set(1); // 1
 * count.set('not a number'); // Type Error
 */
export class TypedStorage<T> {
  private storage: Storage;

  constructor(private key: string, options: TypedStorageOptions<T> = {}) {
    this.storage = options.storage ?? safeLocalStorage;

    if (options.initialValue != null && this.get() == null) {
      this.set(options.initialValue);
    }
  }

  public get(): T | null {
    const value = this.storage.get(this.key);
    return value ? this.deserialize(value) : null;
  }

  public set(next: T): void {
    this.storage.set(this.key, this.serialize(next));
  }

  public clear(): void {
    this.storage.remove(this.key);
  }

  private serialize(value: T): string {
    return JSON.stringify(value);
  }

  private deserialize(value: string): T | null {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
}
