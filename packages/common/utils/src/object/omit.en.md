---
hide_title: true
sidebar_label: omit
---

# omit

A utility function to construct new object by removing the key-value pairs corresponding to the given keys from the object.

## Example

```typescript
const country = {
  KR: 'KR',
  US: 'US',
  JP: 'JP',
} as const;

omit(country, ['CA']); //  TS2322: Type '"CA"' is not assignable to type '"KR" | "US" | "JP"'
omit(country, ['KR']); //  { US: 'US', JP: 'JP' }
```
