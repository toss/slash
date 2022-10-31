# kstFormat

Formats a date according to Korean Standard Time (KST).

Without this function, importing `date-fns/locale/ko` is needed every time.

## Examples

```typescript
import { kstFormat } from '@toss/date';

// Converts Date to ISO 8601 string based on KST
kstFormat(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
```

```typescript
// This is the same as the example above.
import { format } from 'date-fns';
import locale from 'date-fns/locale/ko';

format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { locale });
```
