---
hide_title: true
sidebar_label: formatToKoreanNumber
---

# formatToKoreanNumber

Converts given number to Korean expression.

```typescript
function formatToKoreanNumber(value: number, options?: { floorUnit?: number; formatAllDigits?: boolean }): string;
```

## Example

```typescript
formatToKoreanNumber(13209802); // 1,320만 9,802
```
