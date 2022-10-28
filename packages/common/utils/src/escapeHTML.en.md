# escapeHTML

```typescript
function escapeHTML(str: string): string;
```

Replace a special character to an HTML entity.

- `&` -> `&amp;`
- `<` -> `&lt;`
- `>` -> `&gt;`
- `'` -> `&#39;`
- `"` -> `&quot;`

## Example

```typescript
escapeHTML('Settings > Notification'); // 'Settings &gt; Notification'
```
