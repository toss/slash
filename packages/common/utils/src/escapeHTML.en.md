# escapeHTML

```typescript
function escapeHTML(str: string): string;
```

Replaces a special character with an HTML entity.

- `&` -> `&amp;`
- `<` -> `&lt;`
- `>` -> `&gt;`
- `'` -> `&#39;`
- `"` -> `&quot;`

## Example

```typescript
escapeHTML('Settings > Notification'); // 'Settings &gt; Notification'
```
