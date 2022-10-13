---
title: hangulIncludes
---

# hangulIncludes

한글 문자열이 다른 한글 문자열을 포함하는지 검사합니다.

예를 들어서, `토스` 는 `톳` 을 포함하고, `값이 비싸다` 는 `갑` 또는 `빘`을 포함합니다.

```typescript
function hangulIncludes(
  // 두 번째 인자 y를 포함하는지 검사할 문자열
  x: string,
  // 첫 번째 인자 x에 포함되는지 검사할 문자열
  y: string
): boolean;
```

## Examples

```typescript
hangulIncludes('토스', ''); // true
hangulIncludes('토스', 'ㅌ'); // true
hangulIncludes('토스', '톳'); // true
hangulIncludes('토스', '톱'); // false
hangulIncludes('토스', '토스'); // true
```
