import { useEffect } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

type VisibilityState = Document['visibilityState'];

/** @tossdocs-ignore */
export function useVisibilityEvent(callback: (visibilityState: VisibilityState) => void) {
  const handleVisibilityChange = usePreservedCallback(() => {
    callback(document.visibilityState);
  });

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
}
