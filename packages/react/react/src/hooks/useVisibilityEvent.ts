import { useCallback, useEffect } from 'react';

type VisibilityState = Document['visibilityState'];

/**
 * @description
 * document의 visibilitychange 이벤트가 발생하면 callback 함수를 호출합니다.
 */
export function useVisibilityEvent(callback: (visibilityState: VisibilityState) => void) {
  const handleVisibilityChange = useCallback(() => {
    callback(document.visibilityState);
  }, [callback]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
}
