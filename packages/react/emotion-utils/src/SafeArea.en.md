---
title: SafeArea
---

# SafeArea

Components that allow you to use SafeArea declaratively.

## Examples

```jsx
// AS-IS
function Page() {
  return (
    <div
      css={css`
        margin-top: ${env.SafeArea.Top};
        margin-bottom: ${env.SafeArea.Bottom};
      `}
    >
      <section>blah blah</section>
    </div>
  );
}

// TO-BE
function Page() {
  return (
    <SafeArea>
      <section>blah blah</section>
    </SafeArea>
  );
}
```
