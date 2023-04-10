import { useReducer } from 'react';

const updater = (num: number): number => (num + 1) % 1_000_000;

/** @tossdocs-ignore */
export function useForceUpdate(): () => void {
  const [, forceUpdate] = useReducer(updater, 0);

  return forceUpdate;
}
