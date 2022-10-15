---
title: is-사업자번호
---

# is-사업자번호

사업자번호 유효성 검사

- http://seoulcredit.co.kr/business_id
- https://myhappyman.tistory.com/129

```typescript
function is사업자번호(value: string): boolean;
```

## Examples

```typescript
is사업자번호('1231231231'); // true
is사업자번호('12312312312'); // false
```
