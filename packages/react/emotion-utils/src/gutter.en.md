---
title: gutter
---

# gutter

Add space between child elements.

```ts
function gutter(options: { direction: AxisDirection; space?: number; selector?: string }): SerializedStyles;
function gutter(direction: AxisDirection, space?: number, selector?: string): SerializedStyles;
```

## Examples

import { Sandpack } from "@codesandbox/sandpack-react";

<!-- prettier-ignore -->
<Sandpack
  template="react"
  files={{
    '/App.js': `/** @jsxImportSource @emotion/react */
import { gutter } from '@toss/emotion-utils';\n
export default function App() {
  return (
    <div css={gutter('horizontal', 16)}>
      <button>
        Button
      </button>
      <button>
        Button
      </button>
      <button>
        Button
      </button>
    </div>
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
const ButtonContainer = styled.div`
  padding: 16px 24px;
  ${gutter('horizontal', 8)}
`;

<Flex.Center
  css={css`
    padding: 0px 20px;
    ${gutter({
      direction: 'horizontal',
      space: 20,
    })}
  `}
>
  <Foo />
</Flex.Center>;
```
