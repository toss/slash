---
hide_title: true
sidebar_label: pick
---

# pick

A utility function to construct new object by picking the key-value pairs corresponding to the given keys from the object.

## Example

```typescript
const country = {
  KR: 'KR',
  US: 'US',
  JP: 'JP',
} as const;

pick(country, ['CA']); //  TS2322: Type '"CA"' is not assignable to type '"KR" | "US" | "JP"'
pick(country, ['KR']); //  Pick<{readonly KR: "KR", readonly US: "US", readonly JP: "JP"}, "KR">
```
