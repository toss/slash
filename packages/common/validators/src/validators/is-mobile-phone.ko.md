---
title: isMobilePhone
---

# isMobilePhone

주어진 문자열이 한국 휴대폰 번호인지 검사합니다. [validator](https://github.com/chriso/validator.js/blob/b30c2cad0ad9593214c20b44d315ce7a0ffc4715/src/lib/isMobilePhone.js#L54)

```typescript
function isMobilePhone(phone: string): boolean;
```

## Examples

```typescript
isMobilePhone('01015994905'); // true
isMobilePhone('010123412345'); // false
```
