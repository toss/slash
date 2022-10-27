/** @tossdocs-ignore */
import { NonEmptyArray } from './NonEmptyArray';

export function last<T>(arr: NonEmptyArray<T>): T;
export function last<T>(arr: T[]): T | undefined;
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
