import { useReducer } from 'react';

const updater = (num: number): number => (num + 1) % 1_000_000;

/**
 * @name useForceUpdate
 * @description
 * 반환된 함수를 실행 시 강제로 리렌더가 실행됩니다.
 *
 * @note useReduce가 state보다 가볍다는 의견이 있습니다. https://github.com/streamich/react-use/pull/837
 */
export function useForceUpdate(): () => void {
  const [, forceUpdate] = useReducer(updater, 0);

  return forceUpdate;
}
