# getOSByUserAgent

User-Agent 문자열을 기반으로 OS를 반환합니다.

```typescript
function getOSByUserAgent(): false | 'ios' | 'android' | 'web';
```

- 반환하는 값:
  - `ios`: iOS 환경
  - `android`: Android 환경
  - `web`: 그 외의 브라우저 환경
  - `false`: 그 외의 서버 환경
