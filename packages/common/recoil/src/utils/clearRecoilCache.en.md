## clearRecoilCache

Clear the selector cache in Recoil. Useful when testing with Jest.

### Examples

```typescript
import { clearRecoilCache } from '@toss/recoil';

afterEach(() => {
  clearRecoilCache();
});
```
