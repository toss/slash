---
title: isMobilePhone
---

# isMobilePhone

Check if the given string is a Korean mobile phone number. [validator](https://github.com/chriso/validator.js/blob/b30c2cad0ad9593214c20b44d315ce7a0ffc4715/src/lib/isMobilePhone.js#L54)

```typescript
function isMobilePhone(phone: string): boolean;
```

## Examples

```typescript
isMobilePhone('01015994905'); // true
isMobilePhone('010123412345'); // false
```
