---
hide_title: true
sidebar_label: formatPhoneNumber
---

# formatPhoneNumber

Separates the given phone number by hyphen(`-`).

```typescript
function formatPhoneNumber(phoneNumber: string): string;
```

## Example

```typescript
formatPhoneNumber('01025560000'); // '010-2556-0000'
formatPhoneNumber('0215994905'); // '02-1599-4905'
formatPhoneNumber('0110000000'); // '011-000-0000'
```
