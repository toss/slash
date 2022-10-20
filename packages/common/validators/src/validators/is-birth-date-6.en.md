---
title: isBirthDate6
---

# isBirthDate6

Checks that the given string is a valid six digits of the date of birth.

```typescript
function isBirthDate6(birthDate: string): boolean;
```

## Examples

```typescript
isBirthDate6('980211'); // true
isBirthDate6('19960729'); // false
isBirthDate6('foobar'); // false
```
