# isMacOS

현재 JS 런타임이 Mac OS 환경에서 실행되었는지 확인합니다.

`navigator.platform`이 아래 문자열 중 어느 하나라도 포함하는지 확인합니다.

- Macintosh
- MacIntel
- MacPPC
- Mac68K

```typescript
const isMacOS: boolean;
```
