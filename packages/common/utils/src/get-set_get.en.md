---
hide_title: true
sidebar_label: get
---

Finds the value in `obj` by `path` and returns it.

```typescript
function get<T = any>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T;
```

## Example

```typescript
get({ a: { b: 1 } }, 'a.b'); // 1
get({ a: { b: 1 } }, 'a.b.c'); // undefined
get<boolean>({ a: { b: true } }, 'a.b.c', false); // false
```
