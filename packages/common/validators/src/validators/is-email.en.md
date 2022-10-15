---
title: is-email
---

# is-email

Check that the email address complies with the RFC 5322 standard. [RFC 5322](https://emailregex.com/)

```typescript
function isEmail(email: string): boolean;
```

## Examples

```typescript
isEmail('raon0211@gmail.com'); // true
isEmail('raon0211@gmail.'); // false
isEmail('raon0211@gmail.com123'); // false
```
