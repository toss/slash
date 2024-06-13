---
title: ClickArea
---

# ClickArea

Clickable한 영역에 사용합니다. 영역이 `anchor`로 감싸지며, 클릭 시 살짝 어두워집니다.

```tsx
<ClickArea
  // CSS className
  className={className}
  // 클릭 시 실행할 함수 (`() => void`)
  onClick={onClick}
  // 클릭 가능 여부 (`boolean`)
  enabled={enabled}
>
  {children}
</ClickArea>
```

## Examples

import { Sandpack } from "@codesandbox/sandpack-react";

<!-- prettier-ignore -->
<Sandpack
  template="react"
  files={{
    '/App.js': `import { ClickArea } from '@toss/react';\n
export default function App() {
  return (
    <ClickArea onClick={() => alert('Clicked!')}>
      Click me
    </ClickArea>
  );
}
`
  }}
  customSetup={{
    dependencies: {
      '@toss/react': 'latest',
    },
  }}
/>
