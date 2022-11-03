---
title: utils
---

# hasBatchim

한글 문자열의 마지막 글자가 받침이 있는지 확인합니다.

```typescript
hasBatchim(
  // 글자에 받침이 있는지 확인하고 싶은 문자열
  str: string
): boolean
```

## Examples

```typescript
hasBatchim('값'); // true
hasBatchim('토'); // false
```

# getFirstConsonants

단어에서 초성을 추출합니다. (예: `토스` -> `'ㅌㅅ'`)

```typescript
getFirstConsonants(
  // 초성을 추출할 단어
  word: string
): string
```

## Examples

```typescript
getFirstConsonants('토스'); // 'ㅌㅅ'
getFirstConsonants('리액트'); // 'ㄹㅇㅌ'
getFirstConsonants('띄어 쓰기'); // 'ㄸㅇ ㅆㄱ'
```
