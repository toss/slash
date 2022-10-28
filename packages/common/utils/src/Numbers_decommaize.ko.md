---
hide_title: true
sidebar_label: decommaizeNumber
---

# decommaizeNumber

[commaize](https://slash.page/ko/libraries/common/utils/src/commaize.i18n)된 숫자에서 콤마를 제거합니다.

```typescript
function decommaizeNumber(numStr: string): number;
```

## Example

```typescript
decommaizeNumber(13209802); // => '13,209,802'
decommaizeNumber('13209802'); // => '13,209,802'
```
