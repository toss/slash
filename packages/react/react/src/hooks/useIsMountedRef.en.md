# useIsMountedRef

`useIsMountedRef` is a hook that allows you to determine whether a component is currently mounted. It is primarily used to prevent side effects, such as asynchronous operations or timers, from occurring when the component is unmounted.

## Motivation([reference](https://github.com/helderberto/use-is-mounted-ref))

- Avoid memory leaks setting states when component are unmounted;
- Control when component already mounted;
- Common error when setting state to unmounted component:

## Example

```ts
const ref = useIsMountedRef();

useEffect(() => {
  if (!ref.isMounted) {
    return;
  }
  if (clientBenefitIntelliQuery.data === undefined) {
    return;
  }
  setBenefitIntelliContents(clientBenefitIntelliQuery.data);
}, [clientBenefitIntelliQuery.data, ref.isMounted]);
```
