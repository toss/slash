---
title: Separated
---

# Separated

각 요소 사이에 반복되는 컴포넌트를 삽입하고자 할 때 사용할 수 있는 편리한 컴포넌트입니다.

```tsx
<Separated with={<Border type="padding24" />}>
  {LIST.map(item => (
    <div>item.title</div>
  ))}
</Separated>
```
