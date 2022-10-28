---
hide_title: true
sidebar_label: decommaizeNumber
---

# decommaizeNumber

Removes commas from [commaized](https://slash.page/libraries/common/utils/src/commaize.i18n) number.

```typescript
function decommaizeNumber(numStr: string): number;
```

## Example

```typescript
decommaizeNumber(13209802); // '13,209,802'
decommaizeNumber('13209802'); // '13,209,802'
```
