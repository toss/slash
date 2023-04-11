---
hide_title: true
sidebar_label: set
---

# set

객체의 특정 경로에 있는 값을 수정합니다.

```typescript
function set(
  // 값을 수정할 객체
  obj: Record<string, any>,
  // 수정할 값의 경로
  path: string,
  // 새로운 값
  value: any
): Record<string, any>;
```

## Example

```typescript
set({ a: { b: 1 } }, 'a.b', 2); // { a: { b: 2 } }
```
