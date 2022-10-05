/**
 * @name escapeHTML
 * @description
 * 특수 문자를 HTML 엔티티로 치환해 줍니다.
 *
 * - `&` -> `&amp;`
 * - `<` -> `&lt;`
 * - `>` -> `&gt;`
 * - `'` -> `&#39;`
 * - `"` -> `&quot;`
 *
 * ```typescript
 * escapeHTML(
 *   // 치환할 문자열
 *   str: string
 * ): string;
 * ```
 *
 * @example
 * escapeHTML('<div>hello</div>') // '&lt;div&gt;hello&lt;/div&gt';
 */
export function escapeHTML(text: string) {
  return text.replace(/[&<>'"]/g, entity => {
    switch (entity) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case "'":
        return '&#39;';
      case '"':
        return '&quot;';
      default:
        return entity;
    }
  });
}
