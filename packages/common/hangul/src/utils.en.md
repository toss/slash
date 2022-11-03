---
title: utils
---

# hasBatchim

Check if a hangul string has a [final consonants (batchim)](https://en.wikipedia.org/wiki/Hangul_consonant_and_vowel_tables) at the end.

```typescript
hasBatchim(
  // The string to check if it has a batchim at the end
  str: string
): boolean
```

## Examples

```typescript
hasBatchim('값'); // true
hasBatchim('토'); // false
```

# getFirstConsonants

Extract the initial consonants of a word. (e.g. `토스` -> `'ㅌㅅ'`)

```typescript
getFirstConsonants(
  // The word to extract the initial consonants from
  word: string
): string
```

## Examples

```typescript
getFirstConsonants('토스'); // 'ㅌㅅ'
getFirstConsonants('리액트'); // 'ㄹㅇㅌ'
getFirstConsonants('띄어 쓰기'); // 'ㄸㅇ ㅆㄱ'
```
