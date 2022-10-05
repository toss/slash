import { TypedStorage } from './TypedStorage';

/**
 * @name NumberTypedStorage
 * @description TypedStorage를 확장하여, number 타입에 specific한 유틸 메소드들을 사용할 수 있습니다.
 *
 * @example
 * import { NumberTypedStorage } from '@tossteam/storage/typed';
 * const count = new NumberTypedStorage('count', { initialValue: 0 });
 * count.increase(); // 1
 * count.decrease(); // 0
 */
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
