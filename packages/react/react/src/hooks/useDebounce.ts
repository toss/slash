import debounce from 'lodash/debounce';
import { useEffect, useMemo } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

/**
 * @description
 * `lodash/debounce` 를 쉽게 사용할 수 있는 hook 입니다.
 *
 * @example
 * // 이 함수는 500ms 기준으로 debounce 됩니다.
 * const handleClick = useDebounce(() => {
 *   getV2Logger().log(schemaId, parameter);
 * }, 500);
 */
export function useDebounce<F extends (...args: any[]) => any>(callback: F, wait: number) {
  const preservedCallback = usePreservedCallback(callback);

  const debounced = useMemo(() => {
    return debounce(preservedCallback, wait);
  }, [preservedCallback, wait]);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return debounced;
}
