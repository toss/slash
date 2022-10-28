---
hide_title: true
sidebar_label: formatPhoneNumber
---

# formatPhoneNumber

전화번호를 하이픈(`-`)이 들어간 형태로 변환합니다.

서울 국번인 경우(`02XXXXZZZZ`)나 10자리 전화번호인 경우(`011XXXZZZZ`) 형태에도 대응하고 있습니다.

```typescript
function formatPhoneNumber(phoneNumber: string): strubg;
```

## Example

```typescript
formatPhoneNumber('01025560000'); // '010-2556-0000'
formatPhoneNumber('0215994905'); // '02-1599-4905'
formatPhoneNumber('0110000000'); // '011-000-0000'
```
