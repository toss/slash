---
title: chosungIncludes
---

# chosungIncludes

문자열의 초성 일치 검색을 수행합니다.

```typescript
function chosungIncludes(
  // 초성 일치하는지 검사할 문자열 (e.g. '프론트엔드')
  x: string,
  // 초성 문자열 (e.g. 'ㅍㄹㅌㅇㄷ')
  y: string
): boolean;
```

```typescript
chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
chosungIncludes('00프론트엔드', 'ㅍㄹㅌ'); // true
chosungIncludes('프론트엔드', 'ㅍㅌ'); // false
chosungIncludes('프론트엔드', '푸롴트'); // false
```
