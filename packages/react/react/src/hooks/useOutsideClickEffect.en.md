# useOutsideClickEffect

Invokes a callback when a click event occurs on an element outside the entered container.

### Example 1

```ts
const ref = useRef<HTMLElement>(null);

useOutsideClickEffect(ref, () => {
  console.log('outside clicked!');
});
```

### Example 2

```ts
const ref1 = useRef<HTMLElement>(null);
const ref2 = useRef<HTMLElement>(null);

useOutsideClickEffect([ref1, ref2], () => {
  console.log('outside clicked!');
});
```
