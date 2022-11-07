---
title: Stack
---

# Stack

A layout component for stacking elements.

- Use `Stack.Horizontal` to stack horizontally.
- Use `Stack.Vertical` to stack vertically.
- Use `gutter` prop to specify spacing between elements.

```ts
function Stack(props: {
  // align-items for elements
  align?: CSSProperties['alignItems'];
  // justify-content for elements
  justify?: CSSProperties['justifyContent'];
  // flex-direction for elements
  // (e.g.: row, column)
  direction?: CSSProperties['flexDirection'];
  // Space between elements
  // @default 24
  gutter?: number;
}): JSX.Element;
const Stack.Vertical: Stack;
const Stack.Horizontal: Stack;
```

## Examples

import { Sandpack } from "@codesandbox/sandpack-react";

<!-- prettier-ignore -->
<Sandpack
  template="react"
  files={{
    '/App.js': `/** @jsxImportSource @emotion/react */
import { Stack } from '@toss/emotion-utils';\n
export default function App() {
  return (
    <Stack.Horizontal gutter={16}>
      <button>
        Button
      </button>
      <button>
        Button
      </button>
      <button>
        Button
      </button>
    </Stack.Horizontal>
  );
}
`,
  }}
  customSetup={{
    dependencies: {
      '@toss/emotion-utils': 'latest',
      '@emotion/react': '^11',
    },
  }}
/>

<!-- prettier-ignore -->
<Sandpack
  template="react"
  files={{
    '/App.js': `/** @jsxImportSource @emotion/react */
import { Stack } from '@toss/emotion-utils';\n
export default function App() {
  return (
    <Stack gutter={16} direction="vertical">
      <button>
        Button
      </button>
      <button>
        Button
      </button>
      <button>
        Button
      </button>
    </Stack>
  );
}
`,
  }}
  customSetup={{
    dependencies: {
      '@toss/emotion-utils': 'latest',
      '@emotion/react': '^11',
    },
  }}
/>

```jsx
function ComponentA() {
  return (
    <Stack gutter={2} direction="horizontal" align="center">
      <Txt color={adaptive.grey800} typography="st8" fontWeight="semibold" textAlign="center">
        {content}
      </Txt>
      <Foo />
    </Stack>
  );
}

function ComponentB() {
  return (
    <Stack.Vertical gutter={40}>
      <Foo />
      <Bar />
    </Stack.Vertical>
  );
}

function ComponentC() {
  return (
    <Stack.Horizontal gutter={20}>
      <Foo />
      <Bar />
    </Stack.Horizontal>
  );
}
```
