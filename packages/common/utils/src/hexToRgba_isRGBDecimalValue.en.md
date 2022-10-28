---
hide_title: true
sidebar_label: isRGBDecimalValue
---

# isRGBDecimalValue

Evaluates whether the given number is between 0 and 255.

# Example

```typescript
isRGBDecimalValue(0); // true
isRGBDecimalValue(255); // true
isRGBDecimalValue(256); // false
isRGBDecimalValue(-1); // false
```
