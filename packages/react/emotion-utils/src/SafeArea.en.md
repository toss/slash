---
title: SafeArea
---

# SafeArea

SafeArea를 선언적으로 사용할 수 있는 컴포넌트 입니다.

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
