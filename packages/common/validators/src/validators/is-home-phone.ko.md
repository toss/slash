---
title: isHomePhone
---

# isHomePhone

주어진 문자열이 집전화번호 (또는 인터넷 전화, 통신사업자 대표전화) 인지 확인합니다.

```typescript
function isHomePhone(value: string): boolean;
```

## Examples

```typescript
isHomePhone('0215994905'); // true
isHomePhone('01022223333'); // false
```
