/** @tossdocs-ignore */
export function sum(...nums: number[] | number[][]) {
  return nums.flat().reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}
