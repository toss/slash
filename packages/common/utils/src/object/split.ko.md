---
hide_title: true
sidebar_label: split
---

# split

객체에서 주어진 키들에 해당하는 키-값 쌍들을 선택하여 새로운 객체와 해당하는 키-값 쌍들을 제외한 새로운 객체를 배열로 반환합니다.

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
