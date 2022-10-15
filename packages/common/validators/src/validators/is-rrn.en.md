---
title: is-rrn
---

# is-rrn

**If a new resident registration number is granted or changed after October 2020, the logic will not work properly.**

Checks whether the given string is a valid resident registration number in the format YYMMDDGHIJKLM reported before October 2020.

- RRN: Resident Registration Number
- https://ko.wikipedia.org/wiki/주민등록번호
- warning: If a new resident registration number is granted or changed after October 2020, the logic will not work properly.

```typescript
function isRRN(
  // 13-character long Korean resident registration number
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
isRRN('1111115111110', { allowForeigner: true }); // false, Foreign registration number that does not satisfy the formula
isRRN('1111115111111', { allowForeigner: true }); // true, Foreign registration number satisfying the formula
```
