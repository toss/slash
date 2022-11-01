---
title: ScreenReaderOnly
---

# ScreenReaderOnly

A component which is not visible but can be read by a screen reader.

This component is used when dealing with accessbility and some text is needed to be read only by the screen reader.

## When is it needed?

- Suppose we want the text 'close' to be read when selecting the dimmer section of a bottom sheet. We might place `<ScreenReaderOnly>Close<ScreenReaderOnly>` in the dimmer.

## Examples

```jsx
<div role="text">This is displayed in the screen and can be read by a screen reader.</div>;

<ScreenReaderOnly>
  <div role="text">This is not displayed in the screen but can be read by a screen reader.</div>
</ScreenReaderOnly>;
```
