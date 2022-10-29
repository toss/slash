---
hide_title: true
sidebar_label: formatBusinessRegistrationNumber
---

# formatBusinessRegistrationNumber

Separates Korean corporate registration number by hypen(`-`).

```typescript
function formatBusinessRegistrationNumber(businessRegistrationNumber: string): string;
```

## Example

```typescript
formatBusinessRegistrationNumber('0000000000'); // '000-00-00000'
```
