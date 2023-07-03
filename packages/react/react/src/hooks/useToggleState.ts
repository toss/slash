import { useCallback, useState } from 'react';

/** @tossdocs-ignore */
export function useToggleState(defaultValue = false): readonly [boolean, () => void] {
  const [bool, setBool] = useState(defaultValue);

  const toggle = useCallback(() => {
    setBool(prevBool => !prevBool);
  }, []);

  return [bool, toggle] as const;
}
