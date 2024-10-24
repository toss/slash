/** @tossdocs-ignore */
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function sum(...nums: number[] | number[][]) {
  return nums.flat().reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}
