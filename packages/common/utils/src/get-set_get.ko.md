---
hide_title: true
sidebar_label: get
---

# get

객체의 특정 경로에 있는 값을 반환합니다.

```typescript
function get<T = any>(
  // 값을 가져올 객체
  obj: Record<string, any>,
  // 가져올 값의 경로
  path: string,
  // 경로에 해당하는 값이 없을 때 반환할 기본값
  defaultValue?: T
): T;
```

## Example

```typescript
get({ a: { b: 1 } }, 'a.b'); // 1
get({ a: { b: 1 } }, 'a.b.c'); // undefined
get<boolean>({ a: { b: true } }, 'a.b.c', false); // false
```
