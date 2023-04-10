# useCallbackOnce

`useCallback`과 유사하지만 콜백을 최초 단 1회만 실행합니다.

mount 시에만 실행할 effect를 정의하는 데에 사용할 수 있습니다.

## Example

```ts
const openAlert = useCallbackOnce(() => {
  alert('이 alert은 1번만 호출돼요');
}, []);

useEffect(() => {
  openAlert();
}, [openAlert]);
```
