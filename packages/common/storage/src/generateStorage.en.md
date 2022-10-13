---
title: generateStorage
---

# generateStorage

Generates a safe local storage accessor. If `window.localStorage` isn't available, generates in-memory local storage.

## Example

```typescript
import { generateStorage } from '@toss/storage';

const safeLocalStorage = generateStorage();

safeLocalStorage.set('key', 'value');

safeLocalStorage.get('key'); // 'value'
```
