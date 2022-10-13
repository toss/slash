---
title: createTypedSessionStorage
---

# createTypedSessionStorage

session storage를 사용하는 [TypedStorage](/ko/libraries/common/storage/src/typed/storages/typedstorage.i18n) 인스턴스를 생성합니다. `initialValue`의 타입에 맞추어 적절한 타입의 인스턴스가 생성됩니다.

## Note

`createTypedSessionStorage`는 subpath export된 module 입니다. 꼭 `@toss/storage/typed`를 사용해주세요.

## Example

```typescript
import { createTypedSessionStorage } from '@toss/storage/typed';

createTypedSessionStorage('obj', { initialValue: { foo: 'bar' } });
// => TypedStorage<{ foo: string }>

createTypedSessionStorage('amount', { initialValue: 1000 });
// => NumberTypedStorage
```
