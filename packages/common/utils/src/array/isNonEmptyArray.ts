/** @tossdocs-ignore */
import { NonEmptyArray } from './NonEmptyArray';

export function isNonEmptyArray<T>(array: T[]): array is NonEmptyArray<T> {
  return array.length >= 1;
}
