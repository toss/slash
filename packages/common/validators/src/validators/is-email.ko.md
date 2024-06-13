---
title: isEmail
---

# isEmail

이메일 주소가 RFC 5322 표준을 따르는지 검사합니다. [RFC 5322](https://emailregex.com/)

```typescript
function isEmail(email: string): boolean;
```

## Examples

```typescript
isEmail('johndoe@example.com'); // true
isEmail('johndoe@example.'); // false
isEmail('johndoe@example.com123'); // false
```
