---
title: NumberTypedStorage
---

# NumberTypedStorage

[TypedStorage](https://slash.page/ko/libraries/common/storage/src/typed/storages/typedstorage.i18n)를 확장하여, number 타입에 specific한 유틸 메소드들을 제공합니다.

## Note

`NumberTypedStorage`는 subpath export된 module 입니다. 꼭 `@toss/storage/typed`를 사용해주세요.

## Example

```typescript
import { NumberTypedStorage } from '@toss/storage/typed';

const count = new NumberTypedStorage('count', { initialValue: 0 });
count.increase(); // 1
count.decrease(); // 0
```
