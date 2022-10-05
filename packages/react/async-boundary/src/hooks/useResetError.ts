/** @tossdocs-ignore */
import { useCallback, useState } from 'react';

export default function useResetError() {
  const [id, setId] = useState(0);
  const refresh = useCallback(() => setId(prev => prev + 1), []);

  return [id, refresh] as const;
}
