---
title: Separated
---

# Separated

Used when there is a component that needs to be inserted repeatedly among the elements.

```tsx
<Separated with={<Border type="padding24" />}>
  {LIST.map(item => (
    <div>item.title</div>
  ))}
</Separated>
```
