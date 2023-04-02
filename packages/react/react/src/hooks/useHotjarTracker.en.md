# useHotjarTracker

A hook to easily add hotjar script tags.

## Example

```ts
useHotjarTracker({
  id: 1579349,
  enable: getOperationalEnvironment() === 'live',
});
```
