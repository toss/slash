---
title: OutsideClick
---

# OutsideClick

`useOutsideClickEffect`의 기능을 선언적으로 처리하는 컴포넌트입니다.

`OutsideClick`로 감싸진 컴포넌트 외부를 클릭하는 경우 `callback`이 실행됩니다.

```tsx
<OutsideClick callback={callback}>{children}</OutsideClick>
```

<br/>

## Attributes

`<OutsideClick>`에 타입을 할당하여 `ElementType`을 지정할 수 있습니다.

필요한 `HTMLAttributes`를 사용할 수 있습니다.

```tsx
function Component() {
  return (
    <OutsideClick<HTMLInputElement, 'input'>
      callback={() => {
        console.log('outside clicked!');
      }}
      {/* input disabled */}
      disabled
    >
      Inside
    </OutsideClick>
  );
}
```

## Examples

import { Sandpack } from "@codesandbox/sandpack-react";

<!-- prettier-ignore -->
<Sandpack
  template="react"
  files={{
    '/App.js': `import { OutsideClick } from '@toss/react';\n
export default function App() {
  return (
    <>
      <OutsideClick callback={() => alert('Outside Clicked!')}>
        Inside
      </OutsideClick>
      <div>Click me</div>
    </>
  );
}
`
  }}
  customSetup={{
    dependencies: {
      '@toss/react': 'latest',
    },
  }}
/>
