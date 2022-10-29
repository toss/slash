# ErrorBoundary

- see https://jbee.io/react/error-declarative-handling-1/ Declaratively handle loading and error conditions
- see https://toss.im/slash-21/sessions/3-1 Suspense & error handling presentation in Slash 21

Declaratively, the component used to manage errors.
`ErrorBoundary` component catches errors in the render/useEffect and renders the given component with `renderFallback`

```typescript
<ErrorBoundary
  // Components to be rendered when an error occurs.
  // The first parameter represents a caught error.
  renderFallback={error => <div>error is occured. {error.message}</div>}
  /*
    Callback function to be called when an error occurs.
    The first parameter represents the caught error, and the second parameter represents the stack of the
    component where the error occurred.
    Type of componentStack의 is `string`
  */
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
