# margin

margin 스타일링을 위한 유틸리티입니다.

```ts
function margin(options: BoxSpacingOption): SerializedStyles;
const margin.<x|y|top|right|bottom|left><4|8|12|16|32>: SerializedStyles;
```

## Examples

import { Sandpack } from "@codesandbox/sandpack-react";

<!-- prettier-ignore -->
<Sandpack
  template="react"
  files={{
    '/App.js': `/** @jsxImportSource @emotion/react */
import { margin } from '@toss/emotion-utils';\n
export default function App() {
  return (
    <>
      <div css={margin(24)}>
        Margin 24
      </div>
      <div css={margin.y12}>
        Margin Y 12
      </div>
      <div css={margin.left(24)}>
        Margin left 24
      </div>
    </>
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
// css`margin: 4px`;
<div css={margin(4)} />;

// css`
//   margin-left: 8px;
//   margin-right: 8px;
//   margin-bottom: 4px;
// `
margin({
  x: 8,
  bottom: 4,
});

// css`
//   margin-left: 12px;
//   margin-right: 12px;
// `
margin.x(4);

// css`
//   margin-top: 12px;
//   margin-bottom: 12px;
// `
margin.y12;

// css`margin-left: 8px;`
margin.left(8);
```
