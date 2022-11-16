---
hide_title: true
sidebar_label: split
---

# split

Return array two objects The first object consists of picked key values, and the second object omitted the selected key values.

## Example

```typescript
const country = {
  KR: 'KR',
  US: 'US',
  JP: 'JP',
} as const;

split(country, ['CA']); //  TS2322: Type '"CA"' is not assignable to type '"KR" | "US" | "JP"'
split(country, ['KR']); //  [ { KR:'KR' }, { US:'US',JP:'JP' } ]
```
