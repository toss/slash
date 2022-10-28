# isServer

```typescript
function isServer(): boolean;
```

Check if the current JavaScript runtime is Node.js.

It can be used to run some logic only in the server, when developing server-side rendered services.

## Example

```typescript
if (isServer()) {
  // Node.js 서버 환경임이 보장된다.
  doSomethingInServer();
}
```
