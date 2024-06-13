---
hide_title: true
sidebar_label: hexToRgba
---

# hexToRgba

16진수 컬러 코드를 `rgba()` 표기로 변환합니다.

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
