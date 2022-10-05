import { useRef, useCallback, useEffect, useMemo } from 'react';

/**
 * @description
 * 안전하게 `setTimeout`으로 뒤로 미뤄진 task를 컴포넌트 unmount 시 cleanup 해주는 hook 입니다.
 */
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
