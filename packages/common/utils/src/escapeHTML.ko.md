# escapeHTML

```typescript
function escapeHTML(text: string): string;
```

특수 문자를 HTML 엔티티로 치환해 줍니다.

- `&` -> `&amp;`
- `<` -> `&lt;`
- `>` -> `&gt;`
- `'` -> `&#39;`
- `"` -> `&quot;`

## Example

```typescript
escapeHTML('설정 > 알림'); // '설정 &gt; 알림'
```
