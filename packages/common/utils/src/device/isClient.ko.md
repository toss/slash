# isClient

현재 JS 런타임이 클라이언트 환경(브라우저)인지 확인합니다.

SSR 환경에서 브라우저에서만 실행되는 로직을 작성할 때 사용합니다.

## Example

```typescript
if (isClient) {
  // 브라우저 환경임이 보장된다.
  doSomethingInBrowser();
}
```
