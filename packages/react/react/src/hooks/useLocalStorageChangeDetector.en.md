# useLocalStorageChangeDetector

Gets the localStorage value that is updated when the browser tab's content is visible.

```ts
// key: Key to use when getting the LocalStorage value
const [value, { clearStorage }] = useLocalStorageChangeDetector(key);
```

## Example

```ts
const [deviceWasRegistered, { clearStorage }] = useLocalStorageChangeDetector('deviceWasRegistered');

useEffect(() => {
  if (deviceWasRegistered !== null) {
    tossAppBridge.showToast('The device was successfully enrolled.');
    fetchDeviceList();
    clearStorage();
  }
}, [deviceWasRegistered]);
```
