---
hide_title: true
sidebar_label: formatToKRW
---

# formatToKoreanNumber

주어진 수를 한국어 표기로 변환합니다.

```typescript
function formatToKRW(
  // 변환할 숫자
  value: number,
  options: {
    // 원 앞에 공백이 들어갑니다. 단독으로 금액을 표시할 때 true로 설정합니다. (문장 안에서는 숫자와 원을 붙여 씁니다.)
    shouldHaveSpaceBeforeWon?: boolean;
    // 내림할 단위.
    floorUnit?: number;
    // 올림할 단위.
    ceilUnit?: number;
    // true일 경우, 모든 자릿수를 format합니다.
    formatAllDigits?: boolean;
  }
): string;
```

## Example

```typescript
formatToKRW(13209802); // '1,320만 9,802원'
formatToKRW(13209802, { floorUnit: 10000 }); // '1,320만원'
formatToKRW(13209802, { ceilUnit: 10000 }); // '1,321만원'
formatToKRW(13200000, { formatAllDigits: true }); // '천3백2십만원'
```
