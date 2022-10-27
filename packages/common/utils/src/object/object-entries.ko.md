---
hide_title: true
sidebar_label: objectEntries
---

# objectEntries

[Object.entries()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)를 사용했을 때 key 타입이 깨지는 불편함을 해소해주는 유틸입니다.

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
