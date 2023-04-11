# SwitchCase

Components that can use the switch-case syntax declaratively

## Example

```jsx
<SwitchCase
  value={status}
  // Depending on whether the status value is `'a'`, `'b'`, or `'c'`, the components below will be rendered.
  caseBy={{
    a: <TypeA />,
    b: <TypeB />,
    c: <TypeC />,
  }}
  // If the status value is nothing, this component will be rendered.
  defaultComponent={<Default />}
/>
```
