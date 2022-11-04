# retryRequestsOf

Returns a function that retries the task execution.

```typescript
function retryRequestsOf<Arguments extends any[], Result>(
  task: (...args: Arguments) => Result | Promise<Result>,
  options: {
    // number of retries
    retries: number;
    // whether to retry
    shouldRetry?: (error: Error) => boolean;
    // function to be called when an error occurs during task execution
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
