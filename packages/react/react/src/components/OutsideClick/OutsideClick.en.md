---
title: OutsideClick
---

# OutsideClick

A component that declaratively handles the functionality of `useOutsideClickEffect`.

If you click outside the component wrapped in `OutsideClick`, `callback` is executed.

```tsx
<OutsideClick callback={callback}>{children}</OutsideClick>
```

<br/>

## Attributes

You can assign an `ElementType` by assigning a type to `<OutsideClick>`.

You can use `HTMLAttributes` as needed.

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
