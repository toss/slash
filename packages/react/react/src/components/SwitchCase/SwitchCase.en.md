# SwitchCase

This is a component that allows you to use the switch-case syntax declaratively. The Case type can accept string, number, and enum.

## Example

```tsx
<SwitchCase
  value={status}
  // Depending on whether the status value is `'a'`, `'b'`, or `'c'`, the components below will be rendered.
  caseBy={{
    a: <TypeA />,
    b: <TypeB />,
    c: <TypeC />,
  }}
  // If the status value does not match any case, this component will be rendered.
  defaultComponent={<Default />}
/>

enum Status {
  A = 'a',
  B = 'b',
  C = 'c',
}

<SwitchCase
  value={Status.A}
  // Depending on whether the Status value is `Status.A`, `Status.B`, or `Status.C`, the components below will be rendered.
  caseBy={{
    [Status.A]: <TypeA />,
    [Status.B]: <TypeB />,
    [Status.C]: <TypeC />,
  }}
/>
```
