`useStorageState` 는 브라우저의 스토리지에 영속적으로 저장되는 상태를 React에서 편리하게 다룰 수 있도록 도와주는 Hook입니다.

## 사용 예시

```tsx
function MyComponent() {
  const [state, setState, refresh] = useStorageState('@service/some-resource', {
    defaultValue: 0,
  });

  useEffect(() => {
    setState(x => x + 1);
  }, []);

  useVisibilityEvent(() => {
    refresh();
  });
}
```

위 예시에서 자동으로 상태는 window.localStorage의 `@service/some-resource` 키에 해당하는 값에 동기화됩니다.

## 함수 시그니처

```tsx
function useStorageState<T>(
  key: string,
  options: {
    defaultValue: T;
    storage: Storage;
  }
);
```

## 다른 종류의 스토리지 사용하기

두 번째 인자로 주어지는 `options` 객체에 `storage` 값을 제공함으로써 다른 종류의 스토리지와 동기화하도록 할 수 있습니다. 예를 들어, SessionStorage에 값을 저장하려면 `safeSessionStorage` 를 제공할 수 있습니다.

기본 스토리지는 `safeLocalStorage` (`window.localStorage` 를 안전하게 사용하는 스토리지) 입니다.

## 주의할 점

- `useStorageState` 는 값을 localStorage 등에 문자열로 저장하기 때문에 직렬화(serialize) 가능한 값만 다룰 수 있습니다. 함수, Symbol과 같이 직렬화 불가능한 값은 다룰 수 없으니 주의해주세요.

## refresh 하기

- `useStorageState`가 반환하는 세 번째 `refresh` 함수로 원래 스토리지와 값을 동기화할 수 있습니다.
- `useVisibilityEvent` 등과 함께 사용할 수 있습니다.
