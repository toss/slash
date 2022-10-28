---
hide_title: true
sidebar_label: objectEntries
---

# objectEntries

A utility function which behaves identical to [Object.entries()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/entries). It strictly infers the `key` type of an object.

## Example

```typescript
const languages = {
  rust: 1,
  swift: 2,
  javascript: 3,
} as const;

// key 타입이 string
Object.entries(languages); // Array<[string, 1 | 2 | 3]>

// key 타입이 'rust' | 'swift' | 'javascript'
objectEntries(languages); // Array<['rust' | 'swift' | 'javascript', 1 | 2 | 3]>
```
