---
title: isBirthDate8
---

# isBirthDate8

Checks that the given string is a valid eight digits of the date of birth.

```typescript
function isBirthDate8(birthDate: string): boolean;
```

## Examples

```typescript
isBirthDate8('980211'); // false
isBirthDate8('19980729'); // true
isBirthDate8('foobar'); // false
```
