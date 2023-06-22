import { useCallback, useState } from 'react';

export function useToggleState(defaultValue = false): readonly [boolean, () => void] {
  const [bool, setBool] = useState(defaultValue);

  const toggle = useCallback(() => {
    setBool(b => !b);
  }, []);

  return [bool, toggle] as const;
}
