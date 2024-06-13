---
hide_title: true
sidebar_label: formatToKoreanNumber
---

# formatToKoreanNumber

주어진 수를 한국어 표기로 변환합니다.

```typescript
function formatToKoreanNumber(value: number, options?: { floorUnit?: number; formatAllDigits?: boolean }): string;
```

## Example

```typescript
formatToKoreanNumber(13209802); // 1,320만 9,802
```
