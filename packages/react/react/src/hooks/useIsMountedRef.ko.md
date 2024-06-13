# useIsMountedRef

Component의 mount 여부를 알 수 있는 hook 입니다.

`useIsMountedRef` 를 이용하여 컴포넌트가 현재 마운트되어 있는지 아닌지를 알 수 있습니다. 주로 비동기 작업 또는 타이머와 같이 컴포넌트가 마운트되지 않은 상태에서 발생하는 부작용을 방지하는 데 유용합니다.

## Motivation([reference](https://github.com/helderberto/use-is-mounted-ref))

- 컴포넌트가 언마운트된 상태에서 상태(State)를 설정하여 메모리 누수를 방지합니다.
- 컴포넌트가 이미 마운트되었는지를 확인하고 제어합니다.
- 언마운트된 컴포넌트에 상태(State)를 설정할 때 흔히 발생하는 오류를 방지합니다.

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
