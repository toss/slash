import { ChangeEvent, useState } from 'react';

/**
 * @name useInputSt8
 * @description Input에 간단한 two way binding이 필요할 때 사용합니다.
 * @example
 * const userName = useInputSt8('')
 *
 * return <input value={userName()} onChange={userName} />
 * @deprecated v18에서 제거 예정입니다.
 */
export default function useInputSt8<T>(initial: (() => T) | T): {
  (): T;
  (event: ChangeEvent<{ value: string }>): void;
} {
  return st8.bind(useState(initial));
}

/** https://github.com/mweststrate/use-st8/blob/master/src/index.ts */
function st8() {
  switch (arguments.length) {
    case 0:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this[0];
    case 1:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      return void this[1](arguments[0]?.currentTarget.value);
    default:
      throw new Error('Expected 0 or 1 arguments');
  }
}
