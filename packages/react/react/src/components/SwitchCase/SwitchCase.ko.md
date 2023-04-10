# SwitchCase

switch-case 구문을 선언적으로 사용할 수 있는 컴포넌트입니다

## Example

```jsx
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
```
