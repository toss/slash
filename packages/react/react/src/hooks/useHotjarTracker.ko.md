# useHotjarTracker

hotjar 관련 script 태그를 쉽게 추가할 수 있는 hook 입니다.

## Example

```ts
useHotjarTracker({
  id: 1579349,
  enable: getOperationalEnvironment() === 'live',
});
```
