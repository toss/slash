---
title: safeLocalStorage
---

# safeLocalStorage

[generateStorage](https://slash.page/ko/libraries/common/storage/src/generatestorage.i18n)로 생성된 local storage accessor 입니다.

## Examples

```typescript
import { safeLocalStorage } from '@toss/storage';

safeLocalStorage.set('key', 'value');

safeLocalStorage.get('key'); // 'value'
```
