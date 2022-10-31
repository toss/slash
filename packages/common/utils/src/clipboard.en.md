# clipboard

A utility to copy texts to clipboard. Returns if the copy operation succeeded.

```tsx
const clipboard = {
  writeText: function(text: string): Promise<boolean>;
}
```

## Example

```typescript
// Copies 'Hello, world!' to clipboard.
const isSuccess = clipboard.writeText('Hello, world!');

if (isSuccess) {
  window.alert('Copy succeeded!');
}
```
