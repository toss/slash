import { useState, useCallback, ChangeEventHandler } from 'react';

/**
 * @description Input에 two way binding이 필요할 때 사용합니다.
 * @example
 * const [value, handleInputChange] = useInputState('')
 *
 * return <input value={value} onChange={handleInputChange} />
 */
export default function useInputState(initialValue = '', transformValue: (value: string) => string = echo) {
  const [value, setValue] = useState(initialValue);

  const handleValueChange: ChangeEventHandler<HTMLElement & { value: string }> = useCallback(
    ({ target: { value } }) => {
      setValue(transformValue(value));
    },
    [transformValue]
  );

  return [value, handleValueChange] as const;
}

function echo(v: string) {
  return v;
}
