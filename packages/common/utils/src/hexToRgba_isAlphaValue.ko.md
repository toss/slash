---
hide_title: true
sidebar_label: isAlphaValue
---

# isAlphaValue

주어진 숫자가 색상의 알파 값의 범위인 0 ~ 1 사이의 값인지 확인합니다.

# Example

```typescript
isAlphaValue(0); // true
isAlphaValue(1); // true
isAlphaValue(1.1); // false
isAlphaValue(-0.1); // false
isAlphaValue(2); // false
```
