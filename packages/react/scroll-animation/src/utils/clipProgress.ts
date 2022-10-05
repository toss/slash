/** @tossdocs-ignore */
/**
 * 0~1 사이의 값으로 만드는 함수
 */
export function clipProgress(progress: number) {
  return Math.min(Math.max(progress, 0), 1);
}
