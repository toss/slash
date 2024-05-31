/** @tossdocs-ignore */
import { safeLocalStorage, Storage } from '../../storage';

export interface TypedStorageOptions<T> {
  storage?: Storage;
  initialValue?: T;
}

export class TypedStorage<T> {
  private storage: Storage;

  constructor(private key: string, options: TypedStorageOptions<T extends boolean ? boolean : T> = {}) {
    this.storage = options.storage ?? safeLocalStorage;

    if (options.initialValue != null && this.get() == null) {
      this.set(options.initialValue);
    }
  }

  public get(): T | null {
    const value = this.storage.get(this.key);
    return value ? this.deserialize(value) : null;
  }

  public set(next: T extends boolean ? boolean : T): void {
    this.storage.set(this.key, this.serialize(next));
  }

  public clear(): void {
    this.storage.remove(this.key);
  }

  private serialize(value: T extends boolean ? boolean : T): string {
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
