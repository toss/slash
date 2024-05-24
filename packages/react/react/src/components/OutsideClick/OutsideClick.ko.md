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

제네릭을 제공하여`<OutsideClick>`에 `ElementType`을 지정할 수 있습니다.

필요한 `HTMLAttributes`를 사용할 수 있습니다.

```tsx
function Component() {
  return (
    <OutsideClick<'input'>
      as="input"
      callback={() => {
        console.log('outside clicked!');
      }}
    />
  );
}
```

<br/>

### Caveats

```ts
type NonHaveChildElements =
  | 'input'
  | 'textarea'
  | 'img'
  | 'br'
  | 'hr'
  | 'meta'
  | 'link'
  | 'base'
  | 'col'
  | 'embed'
  | 'source'
  | 'track'
  | 'wbr';
```

`NonHaveChildElements`에 속한 태그는 자식이 존재하지 않으므로 `self-closing tags`를 사용합니다.

<br/>

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
