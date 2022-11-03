# padding

`padding` 스타일링을 위한 유틸리티입니다.

```ts
type BoxSpacingOption =
 | CSSPixelValue
 | {
     x?: CSSPixelValue;
     y?: CSSPixelValue;
   }
 | {
     x?: CSSPixelValue;
     top?: CSSPixelValue;
     bottom?: CSSPixelValue;
   }
 | {
     y?: CSSPixelValue;
     left?: CSSPixelValue;
     right?: CSSPixelValue;
   }
| {
    top?: CSSPixelValue;
     right?: CSSPixelValue;
     bottom?: CSSPixelValue;
     left?: CSSPixelValue;
   };

function padding(options: BoxSpacingOption): SerializedStyles;
const padding.<x|y|top|right|bottom|left><4|8|12|16|32>: SerializedStyles;
```

## Examples

import { Sandpack } from "@codesandbox/sandpack-react";

<!-- prettier-ignore -->
<Sandpack
  template="react"
  files={{
    '/App.js': `/** @jsxImportSource @emotion/react */
import { padding } from '@toss/emotion-utils';\n
export default function App() {
  return (
    <>
      <div css={padding(24)}>
        Padding 24
      </div>
      <div css={padding.y12}>
        Padding Y 12
      </div>
      <div css={padding.left(24)}>
        Padding left 24
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
// css`padding: 4px`;
<div css={padding(4)} />;

// css`
//   padding-left: 8px;
//   padding-right: 8px;
//   padding-bottom: 4px;
// `
padding({
  x: 8,
  bottom: 4,
});

// css`
//   padding-left: 12px;
//   padding-right: 12px;
// `
padding.x(4);

// css`
//   padding-top: 12px;
//   padding-bottom: 12px;
// `
padding.y12;

// css`padding-left: 8px;`
padding.left(8);
```
