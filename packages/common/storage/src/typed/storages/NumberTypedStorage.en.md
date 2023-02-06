---
title: NumberTypedStorage
---

# NumberTypedStorage

Provides number-specific utils by extending [TypedStorage](https://slash.page/libraries/common/storage/src/typed/storages/typedstorage.i18n).

## Note

`NumberTypedStorage` is subpath exported module. You should use `@toss/storage/typed` to use it.

## Example

```typescript
import { NumberTypedStorage } from '@toss/storage/typed';

const count = new NumberTypedStorage('count', { initialValue: 0 });
count.increase(); // 1
count.decrease(); // 0
count.increase(10); // 10
count.decrease(5); // 5
```
