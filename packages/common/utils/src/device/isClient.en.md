# isClient

Checks if the current JavaScript runtime is running on the browser.

Used to run browser-specific logics.

## Example

```typescript
if (isClient()) {
  // Guarantees to be run on the client-side
  doSomethingInBrowser();
}
```
