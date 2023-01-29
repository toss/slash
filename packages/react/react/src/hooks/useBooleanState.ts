import { useCallback, useState } from 'react';

/**
 * @description
 * boolean 타입으로 useState를 쉽게 사용할 수 있는 hook 입니다.
 *
 * ```ts
 * function useBooleanState(defaultValue = false): readonly [bool, boolValue];
 * ```
 *
 * @example
 * const [open, setOpen] = useBooleanState(false);
 */
export const useBooleanState = (defaultValue = false): readonly [boolean, (state?: boolean) => void] => {
  const [bool, setBool] = useState(defaultValue);

  const handleBoolChange = useCallback(
    (state?: boolean) => setBool(b => (typeof state === 'boolean' ? state : !b)),
    []
  );

  return [bool, handleBoolChange] as const;
};
