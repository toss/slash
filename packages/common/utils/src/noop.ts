/**
 * @name noop
 * @description
 * 아무것도 하지 않는 함수.
 * 주로 함수의 default 값을 undefined/null로 세팅하기 애매한 구조나, 함수를 넘겨줘야 되는 인터페이스를 갖고 있는 API를 충족하기 위해 사용합니다
 *
 * ```typescript
 * function noop(): void;
 * ```
 *
 * @example
 * usePreservedCallback(props.callback ?? noop);
 */
export const noop = () => {};

/**
 * @name asyncNoop
 * @description
 * 아무것도 하지 않는 async 함수
 * 주로 함수의 default 값을 undefined/null로 세팅하기 애매한 구조나, 함수를 넘겨줘야 되는 인터페이스를 갖고 있는 API를 충족하기 위해 사용합니다
 *
 * ```typescript
 * async function asyncNoop(): Promise<void>;
 * ```
 *
 * @example
 * useINeedAnAsyncFunction({func: asyncNoop});
 */
export const asyncNoop = async () => {};
