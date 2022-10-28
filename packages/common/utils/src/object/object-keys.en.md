---
hide_title: true
sidebar_label: objectKeys
---

# objectKeys

A utility function which behaves identical to [Object.keys()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/keys). It strictly infers the `key` type of an object.

## Example

```typescript
const languages = {
  rust: 1,
  swift: 2,
  javascript: 3,
} as const;

Object.keys(languages); // Array<string>

objectKeys(languages); // Array<'rust' | 'swift' | 'javascript'>
```
