import { useCallback, useEffect, useMemo, useRef } from 'react';

/** @tossdocs-ignore */
export function useTimeoutQueue() {
  const enqueuedTasksRef = useRef(new Set<number>());

  const add = useCallback((task: () => void, ms: number) => {
    const subscription = window.setTimeout(() => {
      task();
      enqueuedTasksRef.current.delete(subscription);
    }, ms);

    enqueuedTasksRef.current.add(subscription);
  }, []);

  useEffect(() => {
    const enqueuedTasks = enqueuedTasksRef.current;

    return () => {
      for (const enqueuedTask of enqueuedTasks) {
        window.clearTimeout(enqueuedTask);
      }
    };
  }, []);

  const queue = useMemo(() => {
    return { add };
  }, [add]);

  return queue;
}
