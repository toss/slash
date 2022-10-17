---
title: generateSessionStorage
---

# generateSessionStorage

Generates a safe session storage accessor. If `window.sessionStorage` isn't available, generates in-memory local storage.

## Example

```typescript
import { generateSessionStorage } from '@toss/storage';

const safeSessionStorage = generateSessionStorage();

safeSessionStorage.set('key', 'value');

safeSessionStorage.get('key'); // 'value'
```
