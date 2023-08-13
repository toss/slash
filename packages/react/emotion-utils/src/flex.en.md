---
title: flex
---

# flex

Utilities for flex styling

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

const MyButton3 = styled.button`
  width: 50px;
  height: 50px;
  background-color: rgb(249, 250, 251, 0.6);
  ${flex.center()}
`;

const MyButton4 = styled.button`
  width: 50px;
  height: 50px;
  background-color: rgb(249, 250, 251, 0.6);
  ${flex.center('column')}
`;
```

```jsx
function ComponentA() {
  return (
    <Flex align="center" justify="space-between">
      <Item>Item 1</Item>
      <Item>Item 2</Item>
    </Flex.Center>
  );
}

function ComponentB() {
  return (
    <Flex.CenterVertical>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
    </Flex.CenterVertical>
  );
}

function ComponentC() {
  return (
    <Flex.CenterHorizontal>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
    </Flex.CenterHorizontal>
  );
}
```
