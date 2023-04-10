---
hide_title: true
sidebar_label: maskName
---

# maskName

입력받은 이름의 일부를 masking 합니다.

```typescript
function maskName({
  // 마스킹할 이름
  name: string,
  options: {
    // 마스킹 시 사용할 문자
    // @default '*'
    maskChar?: string;
  }
}): string
```

## Example

```typescript
maskName('허재'); // '허*'
maskName('나토스'); // '나*스'
maskName('제갈토스'); // '제**스'
maskName('NA TO SEU'); // 'N*******U'
maskName('박토스', { maskChar: '#' }); // '박#스'
```
