/** @tossdocs-ignore */
import { TypedStorage } from './TypedStorage';

export class NumberTypedStorage extends TypedStorage<number> {
  public increase(): void {
    const value = this.get() ?? 0;
    this.set(value + 1);
  }

  public decrease(): void {
    const value = this.get() ?? 0;
    this.set(value - 1);
  }
}
