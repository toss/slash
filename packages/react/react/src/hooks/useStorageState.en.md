# useStorageState

`UseStorageState` is a Hook that makes it convenient for React to handle persistent state in the browser's storage.

## Example

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

In the example above, automatically the state is synchronized to the value corresponding to the `@service/some-resource` key in window.localStorage.

## Call signature

```tsx
function useStorageState<T>(
  key: string,
  options: {
    defaultValue: T;
    storage: Storage;
  }
);
```

## Using a different kind of storage

You can tell the `options` object given as the second argument to synchronize with a different kind of storage by providing a `storage` value. For example, if you want to store values in SessionStorage, you can provide `safeSessionStorage`.

The default storage is `safeLocalStorage` (storage that safely uses `window.localStorage`).

## Caution

- Because `useStorageState` stores values as strings in localStorage, it can only handle serializable values. It cannot handle non-serializable values such as functions and symbols.

## To Refresh

- The third `refresh` function returned by `useStorageState` allows you to synchronize the value with the original storage.
- It can be used in conjunction with `useVisibilityEvent`, etc.
