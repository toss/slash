---
title: mediaQuery
---

# mediaQuery

Media query를 쉽게 작성할 수 있는 유틸리티 입니다.

## Examples

```jsx
const ResizableBox = styled.button`
  width: 300px;

  ${mediaQuery('(max-width: 500px)')`
      width: 100px;
    `}
`;
```
