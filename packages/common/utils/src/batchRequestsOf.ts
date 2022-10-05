/**
 * @name batchRequestsOf
 * @description
 * 비동기 함수 `func`가 짧은 시간 안에 여러 번 실행되어도 한 번만 호출되도록 합니다.
 * 함수 호출의 결과값은 첫 번째 `func` 함수 호출의 결과값이 됩니다.
 * ```typescript
 * batchRequestsOf<Func extends (...args: any[]) => any>(
 *   // 요청을 합칠 함수
 *   func: Func
 * ): Func
 * ```
 * @example
 * async function functionToBatch(num: number) {
 *   return new Promise<number>(resolve => {
 *     setTimeout(() => {
 *       resolve(num);
 *     }, 1000)
 *   });
 * }
 *
 * const batchedFunc = batchRequestsOf(functionToBatch);
 *
 * batchedFunc(1);
 * batchedFunc(2);
 * batchedFunc(1);
 *
 * // batchedFunc는 인자가 1일 때 1번, 인자가 2일 때 한 번 호출됨
 * @param func 요청을 합칠 함수
 */
export function batchRequestsOf<F extends (...args: any[]) => any>(func: F) {
  const promiseByKey = new Map<string, Promise<ReturnType<F>>>();

  return function (...args: Parameters<F>) {
    const key = JSON.stringify(args);

    if (promiseByKey.has(key)) {
      return promiseByKey.get(key)!;
    } else {
      const promise = func(...args);
      promise.then(() => {
        promiseByKey.delete(key);
      });
      promiseByKey.set(key, promise);

      return promise;
    }
  } as F;
}
