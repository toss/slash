---
hide_title: true
sidebar_label: objectKeys
---

# objectKeys

[Object.keys()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)를 사용했을 때 key 타입이 깨지는 불편함을 해소해주는 유틸입니다.

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
