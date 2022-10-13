---
title: createTypedLocalStorage
---

# createTypedLocalStorage

Generates a [TypedStorage](./storages/TypedStorage.en.md) instance using local storage, depending on type of `initialValue`;

## Note

`createTypedLocalStorage` is subpath exported module. You should use `@toss/storage/typed` to use it.

## Example

```typescript
import { createTypedLocalStorage } from '@toss/storage/typed';

createTypedLocalStorage('obj', { initialValue: { foo: 'bar' } });
// => TypedStorage<{ foo: string }>

createTypedLocalStorage('amount', { initialValue: 1000 });
// => NumberTypedStorage
```
