# useOutsideClickEffect

입력한 컨테이너 밖의 요소에서 클릭 이벤트가 발생하였을때 콜백을 호출합니다.

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
