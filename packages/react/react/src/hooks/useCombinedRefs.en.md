# useCombinedRefs

A hook you can use when you want to combine multiple refs into one.

```ts
function useCombinedRefs<T>(...refs: Array<Ref<T> | CallbackRef<T>>): Ref<T>;
```

## Example

```tsx
const Example = forwardRef<HTMLDivElement, Props>((props, parentRef) => {
  const myRef = useRef<HTMLDivElement>(null);
  const ref = useCombinedRefs(myRef, parentRef);

  // When the bottom div is updated, both "myRef" and "parentRef" are updated
  return <div ref={ref} />;
});
```
