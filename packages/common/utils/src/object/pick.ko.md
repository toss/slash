---
hide_title: true
sidebar_label: pick
---

# pick

지정한 key로만 이루어진 객체를 생성합니다.

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
