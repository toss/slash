---
title: disassembleHangul
---

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
disassembleHangulToGroups('값'); // 'ㄱㅏㅂㅅ'
disassembleHangulToGroups('값이 비싸다'); // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
disassembleHangulToGroups('ㅘ'); // 'ㅗㅏ'
disassembleHangulToGroups('ㄵ'); // 'ㄴㅈ'
```
