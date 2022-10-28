# clipboard

A utility to copy texts to clipboard. Returns if the copy operation succeeded.

```tsx
const clipboard = {
  writeText: function(text: string): Promise<boolean>;
}
```

## Example

```typescript
// Copy 'Hello, World!' to the clipboard
const isSuccess = clipboard.writeText('Hello, World!');

if (isSuccess) {
  window.alert('Copy succeeded!');
}
```
