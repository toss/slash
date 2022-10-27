---
title: safeSessionStorage
---

# safeSessionStorage

[generateSessionStorage](https://slash.page/ko/libraries/common/storage/src/generatesessionstorage.i18n)로 생성된 session storage accessor 입니다.

## Examples

```typescript
import { safeSessionStorage } from '@toss/storage';

safeSessionStorage.set('key', 'value');

safeSessionStorage.get('key'); // 'value'
```
