# SwitchCase

switch-case 구문을 선언적으로 사용할 수 있는 컴포넌트입니다.
`Case` 타입은 `string`, `number`, `enum`을 모두 받을 수 있습니다.

## Example

```tsx
<SwitchCase
  value={status}
  // status 값이 `'a'`, `'b'`, `'c'` 인지에 따라서 아래 컴포넌트가 render 됩니다.
  caseBy={{
    a: <TypeA />,
    b: <TypeB />,
    c: <TypeC />,
  }}
  // status 값이 아무것도 해당되지 않는 경우, 이 컴포넌트가 render 됩니다.
  defaultComponent={<Default />}
/>

enum Status {
  A = 'a',
  B = 'b',
  C = 'c',
}

<SwitchCase
  value={Status.A}
  // Status 값이 `Status.A`, `Status.B`, `Status.C` 인지에 따라서 아래 컴포넌트가 render 됩니다.
  caseBy={{
    [Status.A]: <TypeA />,
    [Status.B]: <TypeB />,
    [Status.C]: <TypeC />,
  }}
/>
```
