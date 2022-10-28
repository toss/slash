# isClient

Check if the current JavaScript runtime is running on the browser.

Used to run browser-specific logics.

## Example

```typescript
if (isClient()) {
  // 브라우저 환경임이 보장된다.
  doSomethingInBrowser();
}
```
