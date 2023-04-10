# useLocalStorageChangeDetector

브라우저 탭의 컨텐츠가 visible 일 때 업데이트 되는 localStorage 값을 가져옵니다.

```ts
// key: LocalStorage 값을 가져올 때 사용할 Key
const [value, { clearStorage }] = useLocalStorageChangeDetector(key);
```

## Example

```ts
const [deviceWasRegistered, { clearStorage }] = useLocalStorageChangeDetector('deviceWasRegistered');

useEffect(() => {
  if (deviceWasRegistered !== null) {
    tossAppBridge.showToast('기기가 정상적으로 등록되었습니다.');
    fetchDeviceList();
    clearStorage();
  }
}, [deviceWasRegistered]);
```
