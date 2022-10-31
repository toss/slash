---
title: gutter
---

# gutter

Child Element 사이에 space를 부여합니다.

```ts
function gutter(options: { direction: AxisDirection; space?: number; selector?: string }): SerializedStyles;
function gutter(direction: AxisDirection, space?: number, selector?: string): SerializedStyles;
```

## Examples

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
