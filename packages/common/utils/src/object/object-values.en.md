---
hide_title: true
sidebar_label: objectValues
---

# objectValues

A function which behaves identical to [Object.values()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/values).

## Example

```typescript
const languages = {
  rust: 1,
  swift: 2,
  javascript: 3,
} as const;

objectValues(languages); // Array<1 | 2 | 3>
```
