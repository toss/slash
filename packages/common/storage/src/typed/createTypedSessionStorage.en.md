---
title: createTypedSessionStorage
---

# createTypedSessionStorage

Generates a [TypedStorage](./storages/TypedStorage.en.md) instance using session storage, depending on type of `initialValue`;

## Note

`createTypedSessionStorage` is subpath exported module. You should use `@toss/storage/typed` to use it.

## Example

```typescript
import { createTypedSessionStorage } from '@toss/storage/typed';

createTypedSessionStorage('obj', { initialValue: { foo: 'bar' } });
// => TypedStorage<{ foo: string }>

createTypedSessionStorage('amount', { initialValue: 1000 });
// => NumberTypedStorage
```
