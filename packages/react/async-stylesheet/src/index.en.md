---
title: AsyncStylesheet
---

# AsyncStylesheet

In general, CSS styleshees blocks rendering when contained in `<head />`. You can import non-blocking CSS stylesheets by using `AsyncStylesheet`s. This can only be used in Next.js projects.

## When should it be used?

- When using CSS stylesheets which load font files, there are situations where they are too big. When we wish the text to be displayed in system default font even though the stylesheet is not loaded, `AsyncStylesheet` can be used.

## Examples

```jsx
import { Head } from 'next/head';

// Load CSS which blocks rendering
function BlockingHead() {
  return (
    <Head>
      <link rel="stylesheet" type="text/css" href="https://static.toss.im/tps/main.css" />
    </Head>
  );
}

// Load CSS, which does not block rendering
function NonBlockingHead() {
  return <AsyncStylesheet href="https://static.toss.im/tps/others.css" />;
}
```

## References

- https://github.com/joe-bell/next-google-fonts/blob/main/src/index.tsx
