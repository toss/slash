/** @tossdocs-ignore */
import { NonEmptyArray } from "./NonEmptyArray";

/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function last<T>(arr: NonEmptyArray<T>): T;
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function last<T>(arr: T[]): T | undefined;
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
