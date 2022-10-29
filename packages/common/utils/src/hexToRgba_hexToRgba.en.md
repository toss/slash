---
hide_title: true
sidebar_label: hexToRgba
---

# hexToRgba

Converts a hexadecimal color code to `rgba()` expression.

```typescript
function hexToRgba(hex: string, alpha?: number): string;
```

# Example

```typescript
hexToRgba('#000000'); // 'rgba(0, 0, 0, 1)'
hexToRgba('#000000', 0.5); // 'rgba(0, 0, 0, 0.5)'
hexToRgba('#17171c'); // 'rgba(23, 23, 28, 1)'
hexToRgba('17171c'); // 'rgba(23, 23, 28, 1)'
```
