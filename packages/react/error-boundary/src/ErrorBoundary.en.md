# ErrorBoundary

A component which is useful to manage an error declaratively.

It catches the error occurred on render or in `useEffect` callback and then renders `renderFallback`.

## Example

```jsx
<ErrorBoundary
  // Components to be rendered when an error occurs.
  // The first parameter represents a caught error.
  renderFallback={error => <div>error is occured. {error.message}</div>}
  //  Callback function to be called when an error occurs.
  //  The first parameter represents the caught error, and the second parameter represents the stack of the
  //  component where the error occurred.
  //  Type of componentStack is `string`
  onError={(error, { componentStack }) => {
    alert(error.message);
    console.log(componentStack);
  }}
  // If the value in the array changes, reset the error caught by ErrorBoundary.
  // Verify that the values are the same with `Object.is()`.
  // @default []
  resetKeys={['key1', 'key2']}
  // Called when the error is initialized.
  // Type is `() => void`.
  onReset={() => {}}
  // Returns whether to ignore the caught error and throw again.
  // If true is returned, do not catch the error from this ErrorBoundary and throw it.
  ignoreError={error => error.message.includes('dummy')}
>
  <COMPONENT_CAN_CREATE_ERROR />
</ErrorBoundary>
```

## References

- [jbee.io | Handling loading and error conditions declaratively](https://jbee.io/react/error-declarative-handling-1/)
- [Slash 21 | Suspense and Error Handling](https://toss.im/slash-21/sessions/3-1)

## useErrorBoundary

React's [error boundary](https://reactjs.org/docs/error-boundaries.html) component cannot catch an error occurred in event handlers, asynchronous code like `setTimeout`, etc.

`useErrorBoundary` is useful to deliver an error to the nearest error boundary in anywhere.

```jsx
const throwError = useErrorBoundary();

<Button
  onClick={() => {
    if (someCondition) {
      // Throws `new Error('throw error')` to the nearest `ErrorBoundary`.
      throwError(new Error('throw error'));
    }
  }}
/>;
```
