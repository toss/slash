---
title: flex
---

# flex

flex 스타일링을 위한 유틸리티

```ts
function flex(options: FlexOptions): SerializedStyles;
function flex(
  align: CSSProperties['alignItems'],
  justify?: CSSProperties['justifyContent'],
  direction?: CSSProperties['flexDirection']
): SerializedStyles;
```

## Examples

```ts
const MyButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: rgb(249, 250, 251, 0.6);
  ${flex({ justify: 'center', align: 'center' })};
`;

const MyButton2 = styled.button`
  width: 50px;
  height: 50px;
  background-color: rgb(249, 250, 251, 0.6);
  ${flex('center', 'center')}
`;
```
