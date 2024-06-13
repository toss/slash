---
title: generateStorage
---

# generateStorage

안전한 local storage accessor를 생성합니다. local storage를 사용할 수 없는 환경인 경우, inmemory storage를 생성합니다.

## Examples

```typescript
import { generateStorage } from '@toss/storage';

const safeLocalStorage = generateStorage();

safeLocalStorage.set('key', 'value');

safeLocalStorage.get('key'); // 'value'
```
