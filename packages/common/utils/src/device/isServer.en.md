# isServer

```typescript
function isServer(): boolean;
```

Checks if the current JavaScript runtime is Node.js.

It can be used to run some logic only in the server, when developing server-side rendered services.

## Example

```typescript
if (isServer()) {
  // Guarantees to be run on the server-side
  doSomethingInServer();
}
```
