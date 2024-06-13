---
hide_title: true
sidebar_label: omit
---

# omit

객체에서 주어진 키들에 해당하는 키-값 쌍들을 제거하여 새로운 객체를 만드는 유틸입니다.

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
