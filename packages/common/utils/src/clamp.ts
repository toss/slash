/** @tossdocs-ignore */
export function clamp(value: number, bound1: number, bound2?: number) {
  if (bound2 == null) {
    return Math.min(value, bound1);
  }

  if (bound2 < bound1) {
    throw new Error('The value of bound2 must be a number greater than bound1.');
  }

  return Math.min(Math.max(value, bound1), bound2);
}
