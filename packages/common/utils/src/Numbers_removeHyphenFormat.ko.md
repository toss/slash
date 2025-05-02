---
hide_title: true
sidebar_label: removeHyphenFormat
---

# removeHyphenFormat

[commaize](https://slash.page/ko/libraries/common/utils/src/Numbers_removeHyphenFormat.i18n)된 숫자에서 하이픈을 제거합니다.

```typescript
function removeHyphenFormat(numStr: string): number;
```

## Example

```typescript
removeHyphenFormat('02-777-9999'); // 027779999
removeHyphenFormat('000-00-00000'); // 0000000000
```
