---
hide_title: true
sidebar_label: pick
---

# pick

Creates an object which composed of the given keys.

## Example

```typescript
const country = {
  KR: 'KR',
  US: 'US',
  JP: 'JP',
} as const;

pick(country, ['CA']); //  TS2322: Type '"CA"' is not assignable to type '"KR" | "US" | "JP"'
pick(country, ['KR']); //  { KR: 'KR' }
```
