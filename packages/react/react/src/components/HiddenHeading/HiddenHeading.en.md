# HiddenHeading

- See: https://www.accessibility-developer-guide.com/examples/headings/html-5-outline/

A heading component that can be used for accessibility purposes.

It is invisible to normal users of the Toss app, but the text is visible only to users using a screen reader.

- A similar component is the `<ScreenReaderOnly />` component.
- When breaking up page sections, remember that assistive technology works differently than HTML5 Outline, so use 'as' appropriately to break up sections meaningfully based on the level of the headings.

## Example

```jsx
// A normal user can easily tell that this is the 'Select Profile Type' bottomsheet by how dark it looks outside of the dimmer, but a screen reader user can't tell which bottomsheet it is.
<BottomSheet>
  <HiddenHeading as="h3" id={id}>
    Select profile type you want to use
  </HiddenHeading>
  <List role="radiogroup" aria-labelledby={id}>
    // blahblah
  </List>
</BottomSheet>
```
