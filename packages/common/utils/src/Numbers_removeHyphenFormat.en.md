---
hide_title: true
sidebar_label: removeHyphenFormat
---

# removeHyphenFormat

Removes hyphen from [commaized](https://slash.page/libraries/common/utils/src/Numbers_removeHyphenFormat.i18n) number.

```typescript
function removeHyphenFormat(numStr: string): number;
```

## Example

```typescript
removeHyphenFormat('02-777-9999'); // 027779999
removeHyphenFormat('000-00-00000'); // 0000000000
```
