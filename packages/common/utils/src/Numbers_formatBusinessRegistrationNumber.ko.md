---
hide_title: true
sidebar_label: formatBusinessRegistrationNumber
---

# formatBusinessRegistrationNumber

사업자등록번호를 하이픈(`-`)이 들어간 형태로 변환합니다.

사업자등록번호는 다음과 같은 규칙을 따릅니다.

- 모든 사업자등록번호는 10자리이다.
- 사업자등록번호는 숫자만 사용할 수 있다.
- 구분자는 하이픈('-'), 3자리, 2자리, 5자리 순으로 구분한다.
  - ex) 000-00-00000

숫자가 아닌 문자가 포함되어 있거나, 10자리가 아니라면 error를 throw합니다.

```typescript
function formatBusinessRegistrationNumber(businessRegistrationNumber: string): string;
```

## Example

```typescript
formatBusinessRegistrationNumber('0000000000'); // '000-00-00000'
```
