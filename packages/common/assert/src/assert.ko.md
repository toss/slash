---
title: 'assert'
---

# assert

입력받은 condition을 단언합니다. TypeScript의 [Asserts](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) 함수로 사용합니다.

```typescript
function assert(
  // Asserts 조건
  condition: unknown,
  // Asserts 조건에 해당하지 않을 경우, throw 할 에러
  // string을 넘기는 경우, `new Error()` 를 감싸서 throw 합니다.
  // @default new Error()
  error: Error | string
): asserts condition;
```

## Examples

```typescript
let accountId: string | null;

assert(accountId != null, new Error('"accountId" 값이 없습니다'));

accountId; // string (type guarded)
```
