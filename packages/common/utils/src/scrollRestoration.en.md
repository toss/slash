# scrollRestoration.set

This is a helper that helps you easily set/clear related to scrollRestoration.

## Example

```typescript
useEffect(() => {
  const clear = scrollRestoration.set('manual');
  return () => clear();
}, []);
```
