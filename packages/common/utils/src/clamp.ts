/**
 * @name clamp
 * @description `value`가 bound안에 존재하면 value를, 아니라면 value와 가까운 bound를 반환(bound1: 최소, bound2: 최대)
 * @example
 * clamp(3, 1) // 3
 * clamp(3, 1, 5) // 3
 * clamp(3, 5) // 5
 * clamp(7, 3, 5) // 5
 */
export function clamp(value: number, bound1: number, bound2?: number) {
  if (bound2 == null) {
    return Math.min(value, bound1);
  }

  return Math.min(Math.max(value, bound1), bound2);
}
