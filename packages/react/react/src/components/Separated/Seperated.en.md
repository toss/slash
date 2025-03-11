---
title: Separated
---

# Separated

A convenient component used to insert a repeating component between each element.

```tsx
<Separated
  with={separator}
  // Adds a separator before the first element
  first={true}
  // Adds a separator after the last element
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
