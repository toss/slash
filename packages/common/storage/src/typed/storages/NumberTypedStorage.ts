/** @tossdocs-ignore */
import { TypedStorage } from './TypedStorage';

export class NumberTypedStorage extends TypedStorage<number> {
  public increase(offset = 1): void {
    const value = this.get() ?? 0;
    this.set(value + offset);
  }

  public decrease(offset = 1): void {
    const value = this.get() ?? 0;
    this.set(value - offset);
  }
}
