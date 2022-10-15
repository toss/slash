---
title: is-businessRegNo
---

# is-businessRegNo

Business number validation

- http://seoulcredit.co.kr/business_id
- https://myhappyman.tistory.com/129

```typescript
function isBusinessRegNo(value: string): boolean;
```

## Examples

```typescript
isBusinessRegNo('1231231231'); // true
isBusinessRegNo('12312312312'); // false
```
