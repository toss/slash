---
hide_title: true
sidebar_label: maskName
---

# maskName

Masks `name` with `options.maskChar`.

```typescript
function maskName({
  name: string,
  options: {
    // @default '*'
    maskChar?: string;
  }
}): string
```

## Example

```typescript
maskName('KIM TO SEU'); // 'K********U'
```
