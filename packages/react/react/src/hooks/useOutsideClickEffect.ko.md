# useOutsideClickEffect

입력한 컨테이너 밖의 요소에서 클릭 이벤트가 발생하였을때 콜백을 호출합니다.

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
