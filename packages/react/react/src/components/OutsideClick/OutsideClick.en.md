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

You can assign an `ElementType` to `<OutsideClick>`.

You can use `HTMLAttributes` as needed.

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

Tags belonging to `NonHaveChildElements` use `self-closing tags` because they do not have children.

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
