import { NonEmptyArray } from './NonEmptyArray';

export function sample<T>(arr: NonEmptyArray<T>): T;
export function sample<T>(arr: T[]): T | undefined;
export function sample<T>(arr: T[]): T | undefined {
  const randomIndex = Math.floor(arr.length * Math.random());
  return arr[randomIndex];
}
