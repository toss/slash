# useCheckList

체크리스트에 사용할 hook - checked 관련 control을 제공합니다.

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

리스트의 아이템이 많은 경우 perf 가 떨어질 수 있습니다.
