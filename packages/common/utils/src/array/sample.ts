/** @tossdocs-ignore */
import { NonEmptyArray } from "./NonEmptyArray";

/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function sample<T>(arr: NonEmptyArray<T>): T;
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function sample<T>(arr: T[]): T | undefined;
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function sample<T>(arr: T[]): T | undefined {
  const randomIndex = Math.floor(arr.length * Math.random());
  return arr[randomIndex];
}
