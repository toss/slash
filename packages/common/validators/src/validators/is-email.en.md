---
title: isEmail
---

# isEmail

Check that the email address complies with the RFC 5322 standard. [RFC 5322](https://emailregex.com/)

```typescript
function isEmail(email: string): boolean;
```

## Examples

```typescript
isEmail('johndoe@example.com'); // true
isEmail('johndoe@example.'); // false
isEmail('johndoe@example.com123'); // false
```
