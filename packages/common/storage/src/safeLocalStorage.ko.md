---
title: safeLocalStorage
---

# safeLocalStorage

[generateStorage](./generateStorage.ko.md)로 생성된 local storage accessor 입니다.

## Examples

```typescript
import { safeLocalStorage } from '@toss/storage';

safeLocalStorage.set('key', 'value');

safeLocalStorage.get('key'); // 'value'
```
