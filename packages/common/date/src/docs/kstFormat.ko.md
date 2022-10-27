# kstFormat

한국 시간(KST) 기준으로 Date를 포맷팅하는 함수입니다.q

이 함수를 사용하지 않으면, `date-fns/locale/ko` 를 매번 import 하여 사용해야 합니다.

## Examples

```typescript
import { kstFormat } from '@toss/date';

// 한국 시간 (GMT+9) 기준으로 Date를 ISO 8601 문자열로 바꿉니다.
kstFormat(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
```

```typescript
// 위 예제는 아래 코드와 똑같습니다.
import { format } from 'date-fns';
import locale from 'date-fns/locale/ko';

format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { locale });
```
