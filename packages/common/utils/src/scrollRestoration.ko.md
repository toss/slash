# scrollRestoration.set

scrollRestoration 관련 set/clear를 쉽게 할 수 있도록 도와주는 helper입니다.

## Example

```typescript
useEffect(() => {
  const clear = scrollRestoration.set('manual');
  return () => clear();
}, []);
```
