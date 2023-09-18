import { useEffect } from 'react';
import { usePreservedCallback } from '@toss/react';

export function useDocumentVisibilityChange(_callback: (isVisible: boolean) => void) {
  const callback = usePreservedCallback(_callback);

  useEffect(() => {
    const handleVisibilityChange = () => {
      callback(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [callback]);
}
