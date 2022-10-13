---
title: chosungIncludes
---

# chosungIncludes

Check if a hangul string matches another hangul string, in terms of [initial consonants (chosung)](https://en.wikipedia.org/wiki/Hangul_consonant_and_vowel_tables)

```typescript
function chosungIncludes(
  // The hangul string to check if it matches the next string, in terms of initial consonants
  x: string,
  // The hangul string composed of initial consonants (e.g. 'ㅍㄹㅌㅇㄷ')
  y: string
): boolean;
```

```typescript
chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
chosungIncludes('00프론트엔드', 'ㅍㄹㅌ'); // true
chosungIncludes('프론트엔드', 'ㅍㅌ'); // false
chosungIncludes('프론트엔드', '푸롴트'); // false
```
