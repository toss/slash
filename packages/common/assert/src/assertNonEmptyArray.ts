/** @tossdocs-ignore */
import { NonEmptyArray } from '@toss/utils';

export function assertNonEmptyArray<T>(
  arr: T[],
  error: Error | string = new Error('AssertionError: EmptyArray')
): asserts arr is NonEmptyArray<T> {
  if (arr.length < 1) {
    if (typeof error === 'string') {
      throw new Error(error);
    } else {
      throw error;
    }
  }
}
