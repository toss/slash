---
title: mediaQuery
---

# mediaQuery

A utility that makes it easy to write media queries.

## Examples

```jsx
const ResizableBox = styled.button`
  width: 300px;

  ${mediaQuery('(max-width: 500px)')`
      width: 100px;
    `}
`;
```
