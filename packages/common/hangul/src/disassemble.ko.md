---
title: disassemble
---

# disassembleHangulToGroups

한글 문자열을 글자별로 초성/중성/종성 단위로 완전히 분리합니다.

`ㄵ`와 같은 겹자음은 `['ㄴ', 'ㅈ']`와 같이 풀고, `ㅘ`와 같은 겹모음은 `['ㅗ', 'ㅏ']`와 같이 풉니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function disassembleHangulToGroups(
  // 분리할 한글 문자열
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

한글 문자열을 글자별로 초성/중성/종성 단위로 완전히 분리하여, 하나의 문자열로 만듭니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function disassembleHangul(
  // 분리할 한글 문자열
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
