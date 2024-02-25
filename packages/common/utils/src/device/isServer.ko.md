# isServer

현재 JS 런타임이 서버 환경(Node.js)인지 확인합니다.

SSR 환경에서 서버에서만 실행되는 로직을 작성할 때 사용합니다.

## Example

```typescript
if (isServer) {
  // Node.js 서버 환경임이 보장된다.
  doSomethingInServer();
}
```
