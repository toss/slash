# clearRecoilCache

Recoil의 Selector Cache를 초기화합니다. Jest에서 테스트하는 경우에 유용합니다.

`@toss/recoil` 에서 clearRecoilCache() 를 제공함으로써 beforeEach 등에서 리코일 캐시를 날리도록 합니다.

### Examples

```typescript
import { clearRecoilCache } from '@toss/recoil';

afterEach(() => {
  clearRecoilCache();
});
```
