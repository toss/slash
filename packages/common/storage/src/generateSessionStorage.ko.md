---
title: generateSessionStorage
---

# generateSessionStorage

안전한 session storage accessor를 생성합니다. session storage를 사용할 수 없는 환경인 경우, inmemory storage를 생성합니다.

## Examples

```typescript
import { generateSessionStorage } from '@toss/storage';

const safeSessionStorage = generateSessionStorage();

safeSessionStorage.set('key', 'value');

safeSessionStorage.get('key'); // 'value'
```
