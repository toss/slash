---
hide_title: true
sidebar_label: formatToKRW
---

# formatToKRW

Formats the given number into Korean currency format (KRW).

```typescript
function formatToKRW(
  value: number,
  options: {
    // Determines put a space before '원'.
    shouldHaveSpaceBeforeWon?: boolean;
    // Unit to round down
    floorUnit?: number;
    // Unit to round up
    ceilUnit?: number;
    formatAllDigits?: boolean;
  }
): string;
```

## Example

```typescript
formatToKRW(13209802); // '1,320만 9,802원'
formatToKRW(13209802, { floorUnit: 10000 }); // '1,320만 원'
formatToKRW(13209802, { ceilUnit: 10000 }); // '1,321만 원'
formatToKRW(13200000, { formatAllDigits: true }); // '천3백2십만 원'
```
