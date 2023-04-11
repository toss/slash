# useCheckList

Provides a hook - checked related control to use in the checklist.

```ts
function useCheckList<T extends Item>(
  initialItems: T[]
): {
  list: T[];
  set: (items: T[]) => void;
  // type IdType = T['id'];
  isChecked: (id: IdType) => boolean | undefined;
  isAllChecked: () => boolean;
  check: (id: IdType) => void;
  unCheck: (id: IdType) => void;
  toggle: (id: IdType) => void;
  updateItem: (id: IdType, checked: boolean) => void;
  toggleAll: () => void;
  checkAll: () => void;
  unCheckAll: () => void;
  updateAll: (checked: boolean) => void;
  getCheckedList: () => T[];
  getCheckedIds: () => (string | number)[];
};
```

## Example

```ts
const { list, isChecked, toggle, toggleAll, checkAll, getCheckedIds } = useCheckList(shopList);

useEffect(() => {
  checkAll();
}, [checkAll]);
```

## Warning

If there are many items in the list, perf may drop.
