---
hide_title: true
sidebar_label: pick
---

# pick

객체에서 주어진 키들에 해당하는 키-값 쌍들을 선택하여 새로운 객체를 만드는 유틸입니다.

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
