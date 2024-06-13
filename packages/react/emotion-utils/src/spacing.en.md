---
title: Spacing
---

# Spacing

Components that give Space declaratively

```ts
function Spacing(props: {
  // default: 'vertical'
  direction?: AxisDirection;
  size: CSSPixelValue;
}): JSX.Element;
```

## Examples

```jsx
<Flex css={{ marginTop: -34 }} as="section" direction="column" align="center">
  <Spacing size={40} />
  <AS충족상태Header 전체조건충족={전체조건충족} />
  <Spacing size={24} />
  <무응답고객충족상태Details 전체조건충족={전체조건충족} noResponseInfo={exchangeStatusInfo.noResponseInfo} />
  <Spacing size={16} />
  <연결후24시간경과충족상태Details 전체조건충족={전체조건충족} after24Hour={exchangeStatusInfo.after24Hour} />
</Flex>
```
