import { useCallback, useRef } from 'react';
import useForceUpdate from './useForceUpdate';

interface Item {
  id: string | number;
  checked?: boolean;
}

/**
 * @description
 * 체크리스트에 사용할 hook - checked 관련 control을 제공한다.
 *
 * ```ts
 * function useCheckList<T extends Item>(initialItems: T[]): {
 *   list: T[];
 *   set: (items: T[]) => void;
 *   // type IdType = T['id'];
 *   isChecked: (id: IdType) => boolean | undefined;
 *   isAllChecked: () => boolean;
 *   check: (id: IdType) => void;
 *   unCheck: (id: IdType) => void;
 *   toggle: (id: IdType) => void;
 *   updateItem: (id: IdType, checked: boolean) => void;
 *   toggleAll: () => void;
 *   checkAll: () => void;
 *   unCheckAll: () => void;
 *   updateAll: (checked: boolean) => void;
 *   getCheckedList: () => T[];
 *   getCheckedIds: () => (string | number)[];
 * }
 *
 * @example
 * const { list, isChecked, toggle, toggleAll, checkAll, getCheckedIds } = useCheckList(shopList);
 *
 * useEffect(() => {
 *   checkAll();
 * }, [checkAll]);
 *
 * @warning
 * 리스트의 아이템이 많은 경우 perf 가 떨어질 수 있다.
 */
export default function useCheckList<T extends Item>(initialItems: T[]) {
  type IdType = T['id'];
  const listRef = useRef<T[]>(initialItems);
  const forceUpdate = useForceUpdate();

  const findItem = useCallback((id: IdType) => listRef.current.find(({ id: _id }) => _id === id), []);

  const findIndex = useCallback((id: IdType) => listRef.current.findIndex(({ id: _id }) => _id === id), []);

  const isChecked = useCallback((id: IdType) => findItem(id)?.checked, [findItem]);

  const isAllChecked = useCallback(() => listRef.current.every(({ checked }) => checked), []);

  const set = useCallback(
    (items: T[]) => {
      listRef.current = items;
      forceUpdate();
    },
    [forceUpdate]
  );

  const updateItem = useCallback(
    (id: IdType, checked: boolean) => {
      const idx = findIndex(id);
      if (idx > -1) {
        const item = listRef.current[idx];

        if (item.checked !== checked) {
          const arr = [...listRef.current];
          arr[idx] = { ...item, id, checked };
          set(arr);
        }
      }
    },
    [findIndex, set]
  );

  const toggle = useCallback((id: IdType) => updateItem(id, !isChecked(id)), [isChecked, updateItem]);

  const check = useCallback(
    (id: IdType) => {
      updateItem(id, true);
    },
    [updateItem]
  );

  const unCheck = useCallback(
    (id: IdType) => {
      updateItem(id, false);
    },
    [updateItem]
  );

  const toggleAll = useCallback(() => {
    const toggled = !isAllChecked();
    const arr = listRef.current.map(item => ({ ...item, checked: toggled }));

    set(arr);
  }, [isAllChecked, set]);

  const updateAll = useCallback(
    (checked: boolean) => {
      if (listRef.current.every(item => item.checked === checked)) {
        return;
      }
      set(listRef.current.map(item => ({ ...item, checked })));
    },
    [set]
  );

  const checkAll = useCallback(() => {
    updateAll(true);
  }, [updateAll]);

  const unCheckAll = useCallback(() => {
    updateAll(false);
  }, [updateAll]);

  const getCheckedList = useCallback(() => {
    return listRef.current.filter(item => item.checked);
  }, []);

  const getCheckedIds = useCallback(() => {
    return listRef.current.filter(item => item.checked).map(({ id }) => id);
  }, []);

  return {
    list: listRef.current,
    set,
    isChecked,
    isAllChecked,
    check,
    unCheck,
    toggle,
    updateItem,
    toggleAll,
    checkAll,
    unCheckAll,
    updateAll,
    getCheckedList,
    getCheckedIds,
  };
}
