---
title: josa
---

# josa

Add [postpositions (josa)](https://en.wikipedia.org/wiki/Korean_postpositions) to a hangul string. Postpositions include `'이/가'`, `'을/를'`, `'은/는'`, `'으로/로'`, `'와/과'`, `'이나/나'`, `'이에/에'`, `'이란/란'`, and `아/야'`.

```typescript
function josa(
  // The hangul string to add postpositions
  word: string,
  // The postposition to add
  josa: '이/가' | '을/를' | '은/는' | '으로/로' | '와/과' | '이나/나' | '이에/에' | '이란/란' | '아/야'
): string;
```

## Examples

```typescript
josa('샴푸', '이/가'); // '샴푸가'
josa('칫솔', '이/가'); // '칫솔이'
josa('바깥', '으로/로'); // '바깥으로'
josa('내부', '으로/로'); // '내부로'
```
