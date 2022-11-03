/** @tossdocs-ignore */
interface RetryOptions {
  retries: number;
  shouldRetry?: (error: Error) => boolean;
  onError?: (error: Error) => void | Promise<void>;
}

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
