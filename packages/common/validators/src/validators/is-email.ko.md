---
title: is-email
---

# is-email

이메일 주소가 RFC 5322 표준을 따르는지 검사합니다. [RFC 5322](https://emailregex.com/)

```typescript
function isEmail(email: string): boolean;
```

## Examples

```typescript
isEmail('raon0211@gmail.com'); // true
isEmail('raon0211@gmail.'); // false
isEmail('raon0211@gmail.com123'); // false
```
