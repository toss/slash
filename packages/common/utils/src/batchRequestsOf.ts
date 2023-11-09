/** @tossdocs-ignore */
import { noop } from './noop';

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
      }, noop);
      promiseByKey.set(key, promise);

      return promise;
    }
  } as F;
}
