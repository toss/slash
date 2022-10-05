/** @tossdocs-ignore */
import { clipProgress } from './clipProgress';

interface Options {
  /**
   * 자르기 전의 progress
   */
  progress: number;

  /**
   * progress의 시작
   */
  start?: number;
  /**
   * progress의 끝
   */
  end?: number;
  /**
   * clipProgress 적용 여부 (0~1 사이의 값으로 제한)
   */
  clip?: boolean;
}

/**
 * progress의 일부분을 잘라내어 0부터 1 사이의 값으로 만드는 함수
 *
 * e.g. `start: 0.5`, `end: 0.9` 일 때 `progress: 0.6` 이면 0.5와 0.9 사이에서 25% 진행된 것이므로 `0.25` 반환
 *
 * @param param0
 * @returns 잘린 progress 값
 */
export function sliceProgress({ progress, start = 0, end = 1, clip = true }: Options) {
  if (end === 0) {
    return 1;
  }
  if (start >= end) {
    return start / end;
  }

  const slicedProgress = (progress - start) / (end - start);
  if (clip) {
    return clipProgress(slicedProgress);
  }
  return slicedProgress;
}
