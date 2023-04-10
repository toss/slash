# useIsMounted

This is a hook to determine if a Component is mounted or not.

This is used in SSR environments to execute some behavior after the component is actually mounted in the browser.

- If you use the `isServer()` function instead of this one, the service can seriously malfunction in an SSR environment due to hydration errors.

## Example

```ts
const isMounted = useIsMounted();

useEffect(() => {
  if (!isMounted) {
    return;
  }
  if (clientBenefitIntelliQuery.data === undefined) {
    return;
  }
  setBenefitIntelliContents(clientBenefitIntelliQuery.data);
}, [clientBenefitIntelliQuery.data, isMounted]);
```
