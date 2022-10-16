---
title: isRRN
---

# isRRN

**2020년 10월 이후에 주민등록번호를 새로 부여받거나 변경되는 경우 해당 로직의 동작이 올바르게 동작하지 않습니다.**

주어진 문자열이 2020년 10월 이전에 신고된 YYMMDDGHIJKLM 형식의 유효한 주민등록번호인지 검사합니다.

- RRN: Resident Registration Number
- https://ko.wikipedia.org/wiki/주민등록번호
- warning: 2020년 10월 이후에 주민등록번호를 새로 부여받거나 변경되는 경우 해당 로직의 동작이 올바르게 동작하지 않습니다.

```typescript
function isRRN(
  // 13자 길이의 대한민국 주민등록번호
  val: string,
  options?: {
    // @default false
    allowForeigner?: boolean;
  }
): boolean;
```

## Examples

```typescript
isRRN('1111115111111'); // true
isRRN('1111115111110', { allowForeigner: true }); // false 공식을 만족하지 않는 외국인 등록번호
isRRN('1111115111111', { allowForeigner: true }); // true 공식을 만족하는 외국인 등록번호
```
