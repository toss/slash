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
  // 요소들의 align-items 값
  align?: CSSProperties['alignItems'];
  // 요소들의 justify-content 값
  justify?: CSSProperties['justifyContent'];
  // 요소들의 flex-direction 값
  // (값: row, column)
  direction?: CSSProperties['flexDirection'];
  // 요소들 사이의 간격
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
    <Stack gutter={16} direction="horizontal">
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
