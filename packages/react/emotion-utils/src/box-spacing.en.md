---
title: box-spacing
---

# padding

padding 스타일링을 위한 유틸리티입니다.

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

# margin

margin 스타일링을 위한 유틸리티입니다.

```ts
function margin(options: BoxSpacingOption): SerializedStyles;
const margin.<x|y|top|right|bottom|left><4|8|12|16|32>: SerializedStyles;
```

## Examples

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
