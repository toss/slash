---
title: Separated
---

# Separated

각 요소 사이에 반복되는 컴포넌트를 삽입하고자 할 때 사용할 수 있는 편리한 컴포넌트입니다.

```tsx
<Separated
  with={separator}
  // 첫 번째 요소 앞에 separator를 추가합니다.
  first={true}
  // 마지막 요소 뒤에 separator를 추가합니다.
  last={true}
>
  {children}
</Separated>
```

## Example

```tsx
<Separated with={<Border type="padding24" />}>
  {LIST.map(item => (
    <div>item.title</div>
  ))}
</Separated>
```
