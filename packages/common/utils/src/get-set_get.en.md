---
hide_title: true
sidebar_label: get
---

Finds the value in `obj` by `path` and returns it.

```typescript
function get(
  obj: Record<string, any>,
  path: string,
  // @default undefined
  defaultValue?: any
): Record<string, any> | undefined;
```

## Example

```typescript
get({ a: { b: 1 } }, 'a.b'); // 1
get({ a: { b: 1 } }, 'a.b.c'); // undefined
```
