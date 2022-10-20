---
title: disassembleHangul
---

# disassembleHangul

Disassemble a hangul string into first/middle/last letters, making a single string.

See below for detailed examples.

```typescript
function disassembleHangul(
  // The hangul string to disassemble
  str: string
): string;
```

## Examples

```tsx
disassembleHangul('값'); // 'ㄱㅏㅂㅅ'
disassembleHangul('값이 비싸다'); // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
disassembleHangul('ㅘ'); // 'ㅗㅏ'
disassembleHangul('ㄵ'); // 'ㄴㅈ'
```
