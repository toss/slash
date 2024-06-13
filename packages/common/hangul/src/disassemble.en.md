---
title: disassemble
---

# disassembleHangulToGroups

Disassemble a Hangul string into syllables, but group them by its original character.

Double consonants such as `ㄵ` is disassembled into `['ㄴ', 'ㅈ']`. Similarly, `ㅘ` is disassembled into `['ㅗ', 'ㅏ']`.

See below for detailed examples.

```typescript
function disassembleHangulToGroups(
  // The Hangul string to disassemble
  str: string
): string[][];
```

## Examples

```typescript
disassembleHangulToGroups('값'); // [['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ']]
disassembleHangulToGroups('토스 짱'); // [['ㅌ', 'ㅗ'], ['ㅅ', 'ㅡ'], [' '], ['ㅉ', 'ㅏ', 'ㅇ']]
disassembleHangulToGroups('ㅘ'); // [['ㅗ', 'ㅏ']]
disassembleHangulToGroups('ㄵ'); // [['ㄴ', 'ㅈ']]
```

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
