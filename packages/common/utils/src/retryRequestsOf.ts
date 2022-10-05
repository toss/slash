interface RetryOptions {
  retries: number;
  shouldRetry?: (error: Error) => boolean;
  onError?: (error: Error) => void | Promise<void>;
}

/**
 * @name retryRequestsOf
 * @description
 * task 실행을 재시도하는 함수를 리턴합니다.
 * ```typescript
 * function retryRequestsOf<Arguments extends any[], Result>(
 *   task: (...args: Arguments) => Result | Promise<Result>,
 *   options: {
 *     // 재시도 횟수
 *     retries: number;
 *     // 재시도 여부
 *     shouldRetry?: (error: Error) => boolean;
 *     // task 수행 시 에러가 발생할 때마다 호출되는 함수
 *     onError?: (error: Error) => void | Promise<void>;
 *   }
 * ): (...args: Arguments) => Promise<Result>
 * ```
 *
 * @example
 * function requestAlwaysFailedAPI() {
 *   console.log('called');
 *   throw new Error('Failed');
 * }
 * const retryingTask = retryRequestsOf(
 *   requestAlwaysFailedAPI,
 *   {
 *     retries: 1,
 *     onError: (e) => { console.log(`hello, ${e.message}!`),
 *   },
 * );
 *
 * retryingTask();
 * // => called
 * // => hello, Failed!!
 * // => called
 * // => hello, Failed!!
 * // => Uncaught Error: Failed!
 */
export function retryRequestsOf<Arguments extends any[], Result>(
  task: (...args: Arguments) => Result | Promise<Result>,
  { retries, shouldRetry = () => true, onError }: RetryOptions
) {
  return async function (...args: Arguments) {
    let retriesLeft = retries;

    for await (const result of createTaskStream(task, args)) {
      switch (result.type) {
        case 'SUCCEEDED': {
          return result.value;
        }
        case 'ERROR': {
          await onError?.(result.error);

          if (shouldRetry(result.error) && retriesLeft > 0) {
            retriesLeft -= 1;
            continue;
          } else {
            throw result.error;
          }
        }
      }
    }

    throw new Error('재시도 횟수를 초과했습니다.');
  };
}

async function* createTaskStream<Arguments extends any[], Result>(
  task: (...args: Arguments) => Result | Promise<Result>,
  args: Arguments
) {
  while (true) {
    try {
      const value = await task(...args);

      yield {
        type: 'SUCCEEDED',
        value,
      } as const;
    } catch (error: any) {
      yield {
        type: 'ERROR',
        error,
      } as const;
    }
  }
}
