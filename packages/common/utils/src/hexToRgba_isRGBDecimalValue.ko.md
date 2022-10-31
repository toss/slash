---
hide_title: true
sidebar_label: isRGBDecimalValue
---

# isRGBDecimalValue

주어진 숫자가 RGB 색상 값의 범위인 0 ~ 255 사이의 값인지 확인합니다.

# Example

```typescript
isRGBDecimalValue(0); // true
isRGBDecimalValue(255); // true
isRGBDecimalValue(256); // false
isRGBDecimalValue(-1); // false
```
