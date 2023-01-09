/** @tossdocs-ignore */
import { RefObject, useContext, useRef } from 'react';
import { ScrollProgressContext } from '../contexts';
import { WindowScrollPosition } from '../types';
import { clipProgress, getValueWithoutUnit } from '../utils';

type TriggerHookAlias = 'onEnter' | 'onCenter' | 'onLeave';
type TriggerHook = TriggerHookAlias | number;

const triggerOffsetWeightByTriggerHook: Record<TriggerHookAlias, number> = {
  onEnter: 1,
  onCenter: 0.5,
  onLeave: 0,
};

interface Options {
  /**
   * ref 요소가 뷰포트에 얼마나 등장했을 때 progress가 시작될지 0과 1사이의 숫자로 결정합니다.
   *
   * 아래와 같은 alias를 사용할 수 있습니다.
   *
   * - onEnter: 화면에 등장하기 시작할 때 (triggerHook = 1)
   * - onCenter: 화면 중앙에 ref 요소의 상단이 등장했을 때 (triggerHook = 0.5)
   * - onLeave: 화면에서 벗어나기 시작할 때 (triggerHook = 0)
   *
   * @default 'onCenter'
   */
  triggerHook?: TriggerHook;

  /**
   * trigger가 시작된 후로부터 progress가 얼마동안 진행될지 결정합니다.
   *
   * e.g.
   * - (progress = 200 혹은 200px): 200px를 스크롤 할 때까지
   * - (progress = 200%): ref 요소의 2배 크기 만큼 스크롤 할 때까지
   * - (progress = 150vh): window 높이의 1.5배만큼 스크롤 할 때까지
   *
   * @default `100%`
   */
  duration?: string | number;

  /**
   * clip을 true로 설정하면 progress가 0에서 1 사이의 값으로 계산됩니다.
   * false로 설정하면 ref가 화면에서 벗어나도 progress가 0보다 작거나 1보다 큰 수로 계속 계산됩니다.
   *
   * @default false
   */
  clip?: boolean;
}

function calculateDurationMultipliedByPercent(value: number, percent: number) {
  return Math.max(value * (percent / 100), 1);
}

function calculateScrollDuration(base: number, windowScrollPosition: WindowScrollPosition, duration: string | number) {
  if (base === 0 || duration === 0) {
    return 1;
  }

  if (typeof duration === 'number') {
    return duration;
  }

  try {
    if (duration.endsWith('%')) {
      const percentValue = getValueWithoutUnit(duration);
      return calculateDurationMultipliedByPercent(base, percentValue);
    }

    if (duration.endsWith('vw')) {
      const vwValue = getValueWithoutUnit(duration);
      return calculateDurationMultipliedByPercent(windowScrollPosition.width, vwValue);
    }

    if (duration.endsWith('vh')) {
      const vhValue = getValueWithoutUnit(duration);
      return calculateDurationMultipliedByPercent(windowScrollPosition.height, vhValue);
    }
  } catch {
    // Do nothing
  }

  console.error(`지원하지 않는 duration 형식입니다. duration: ${duration}`);
  return base;
}

function calculateScrollProgress({
  windowScrollPosition,
  rect,
  triggerHook,
  duration,
}: {
  windowScrollPosition: WindowScrollPosition;
  rect: DOMRect;
  triggerHook: TriggerHook;
  duration: number | string;
}): { x: number; y: number } {
  const triggerOffsetWeight =
    typeof triggerHook === 'number' ? triggerHook : triggerOffsetWeightByTriggerHook[triggerHook] ?? 1;

  return {
    x:
      (windowScrollPosition.width * triggerOffsetWeight - rect.left) /
      calculateScrollDuration(rect.width, windowScrollPosition, duration),
    y:
      (windowScrollPosition.height * triggerOffsetWeight - rect.top) /
      calculateScrollDuration(rect.height, windowScrollPosition, duration),
  };
}

/**
 * ref가 화면 내에 있을 때 얼마나 스크롤을 진행했는지 계산합니다.
 */
export function useScrollProgress<T extends HTMLElement>({
  triggerHook = 'onCenter',
  duration = '100%',
  clip = false,
}: Options = {}): { ref: RefObject<T>; scrollXProgress: number; scrollYProgress: number } {
  const ref = useRef<T>(null);
  const windowScrollPosition = useContext(ScrollProgressContext);
  const rect = ref.current?.getBoundingClientRect();

  if (process.env.NODE_ENV === 'development' && windowScrollPosition === undefined) {
    throw new Error('`useScrollProgress`는 `<ScrollProgressController>` 안에서만 사용할 수 있습니다.');
  }

  if (windowScrollPosition === undefined || rect === undefined) {
    return {
      ref,
      scrollXProgress: 0,
      scrollYProgress: 0,
    };
  }

  const progress = calculateScrollProgress({ windowScrollPosition, rect, triggerHook, duration });
  return {
    ref,
    scrollXProgress: clip ? clipProgress(progress.x) : progress.x,
    scrollYProgress: clip ? clipProgress(progress.y) : progress.y,
  };
}
