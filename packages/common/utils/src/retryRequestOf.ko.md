# retryRequestsOf

task 실행을 재시도하는 함수를 리턴합니다.

```typescript
function retryRequestsOf<Arguments extends any[], Result>(
  task: (...args: Arguments) => Result | Promise<Result>,
  options: {
    // 재시도 횟수
    retries: number;
    // 재시도 여부
    shouldRetry?: (error: Error) => boolean;
    // task 수행 시 에러가 발생할 때마다 호출되는 함수
    onError?: (error: Error) => void | Promise<void>;
  }
): (...args: Arguments) => Promise<Result>;
```

## Example

```typescript
function requestAlwaysFailedAPI() {
  console.log('called');
  throw new Error('Failed');
}
const retryingTask = retryRequestsOf(
  requestAlwaysFailedAPI,
  {
    retries: 1,
    onError: (e) => { console.log(`hello, ${e.message}!`),
  },
);

retryingTask();
// => called
// => hello, Failed!!
// => called
// => hello, Failed!!
// => Uncaught Error: Failed!
```
