---
hide_title: true
sidebar_label: objectEntries
---

# objectEntries

A utility function which behaves identical to [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries). It strictly infers the `key` type of an object.

## Example

```typescript
const languages = {
  rust: 1,
  swift: 2,
  javascript: 3,
} as const;

Object.entries(languages); // Array<[string, 1 | 2 | 3]>

objectEntries(languages); // Array<['rust' | 'swift' | 'javascript', 1 | 2 | 3]>
```
