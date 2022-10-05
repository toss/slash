import { useState, useCallback } from 'react';

/**
 * @description
 * boolean 타입으로 useState를 쉽게 사용할 수 있는 hook 입니다.
 *
 * ```ts
 * function useBooleanState(defaultValue = false): readonly [bool, setTrue, setFalse, toggle];
 * ```
 *
 * @example
 * const [open, openBottomSheet, closeBottomSheet, toggleBottomSheet] = useBooleanState(false);
 */
const useBooleanState = (defaultValue = false): readonly [boolean, () => void, () => void, () => void] => {
  const [bool, setBool] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  const toggle = useCallback(() => {
    setBool(b => !b);
  }, []);

  return [bool, setTrue, setFalse, toggle] as const;
};

export default useBooleanState;
