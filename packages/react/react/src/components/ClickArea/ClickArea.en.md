---
title: ClickArea
---

# ClickArea

Make a clickable area. The area is wrapped in a `div`, and becomes a little darker when clicked.

```tsx
<ClickArea
  // CSS className
  className={className}
  // The function to invoke when clicked (`() => void`)
  onClick={onClick}
  // If it can be clicked (`boolean`)
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
