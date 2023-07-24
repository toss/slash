/** @tossdocs-ignore */
import deepEqual from 'fast-deep-equal';

/**
 * @name isSubset
 * @description
 * Checks if the first array is a subset of the second array
 *
 * @param subSet The array to check if it is a subset of the `wholeSet`
 * @param wholeSet A set of comparison for `subSet`
 *
 * @returns boolean ( `subSet` is a subset of `wholeSet` )
 *
 * @example
 * isSubset([], [1,2,3]); // true
 * isSubset([1,2], [1,2,3]); // true
 * isSubset([{a: 1}, {c: 3}], [{a: 1}, {b: 2}, {c: 3}]) // true
 * isSubset([1,2,4], [1,2,3]); // false
 */
export function isSubset(subSet: unknown[], wholeSet: unknown[]): boolean {
  return subSet.every(element => wholeSet.some(wholeSetElement => deepEqual(wholeSetElement, element)));
}
