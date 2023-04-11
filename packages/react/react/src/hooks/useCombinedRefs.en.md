# useCombinedRefs

A hook you can use when you want to combine multiple refs into one.

```ts
function useCombinedRefs<T>(...refs: Array<Ref<T> | CallbackRef<T>>): Ref<T>;
```

## Example

````ts
const SomeComponent = forwardRef((props, parentRef) => {
  const myRef = useRef(null);
  const ref = useCombinedRefs(myRef, parentRef);

  // When the bottom div is updated, both myRef and parentRef are updated
  return <div ref={ref} />;
})```
````
