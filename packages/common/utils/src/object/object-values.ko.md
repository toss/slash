---
hide_title: true
sidebar_label: objectValues
---

# objectValues

[Object.values()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/values)와 똑같이 동작하는 유틸입니다.

## Example

```typescript
const languages = {
  rust: 1,
  swift: 2,
  javascript: 3,
} as const;

objectValues(languages); // Array<1 | 2 | 3>
```
