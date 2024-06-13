# useOutsideClickEffect

Invokes a callback when a click event occurs on an element outside the entered container.

### Example 1

```ts
const [wrapperEl, setWrapperEl] = useState(null);

useOutsideClickEffect(wrapperEl, () => {
  console.log('outside clicked!');
});
return <div ref={setWrapperEl}></div>;
```

### Example 2

```ts
const [wrapperEl, setWrapperEl] = useState(null);
const [wrapperEl2, setWrapperEl2] = useState(null);

useOutsideClickEffect([wrapperEl, wrapperEl2], () => {
  console.log('outside clicked!');
});
return (
  <div>
    <div ref={setWrapperEl}></div>
    <div ref={setWrapperEl2}></div>
  </div>
);
```
