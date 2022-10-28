# getOSByUserAgent

Returns the current operating system by the user agent string.

```typescript
function getOSByUserAgent(): false | 'ios' | 'android' | 'web';
```

- Returns:
  - `ios`
  - `android`
  - `web`: Other browser environments
  - `false`: Other server environments
