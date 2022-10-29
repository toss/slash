/** @tossdocs-ignore */
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
