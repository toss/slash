# getViewportSize

Returns the size of current viewport.

If you were on the server-side, It would be `{ width: 0, height: 0 }`.

```typescript
function getViewportSize(): Readonly<{ width: number; height: number }>;
```
