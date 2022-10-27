import { act, renderHook } from '@testing-library/react';

import { useCheckList } from './useCheckList';

describe('useCheckList', () => {
  it('should carry out initialization', () => {
    const items = [
      { id: 1, checked: false },
      { id: 3, checked: true },
      { id: 5, checked: true },
    ];
    const { result } = renderHook(() => useCheckList(items));

    expect(result.current.list).toBe(items);
    expect(result.current.getCheckedList()).toEqual([
      { id: 3, checked: true },
      { id: 5, checked: true },
    ]);

    expect(result.current.getCheckedIds()).toEqual([3, 5]);

    expect(result.current.isChecked(1)).toBe(false);
    expect(result.current.isChecked(3)).toBe(true);

    expect(result.current.isAllChecked()).toBe(false);
  });

  it('should update well', () => {
    const items = [
      { id: 1, checked: false },
      { id: 3, checked: true },
      { id: 5, checked: true },
    ];
    const { result } = renderHook(() => useCheckList(items));

    act(() => {
      result.current.set([
        { id: 1, checked: true },
        { id: 3, checked: false },
        { id: 5, checked: true },
      ]);
    });

    expect(result.current.isChecked(1)).toBe(true);
    expect(result.current.isChecked(3)).toBe(false);

    act(() => {
      result.current.toggleAll();
    });
    expect(result.current.isAllChecked()).toBe(true);

    act(() => {
      result.current.check(1);
    });
    expect(result.current.isChecked(1)).toBe(true);

    act(() => {
      result.current.unCheck(1);
    });
    expect(result.current.isChecked(1)).toBe(false);

    act(() => {
      result.current.updateItem(1, true);
    });
    expect(result.current.isChecked(1)).toBe(true);

    act(() => {
      result.current.updateItem(1, false);
    });
    expect(result.current.isChecked(1)).toBe(false);

    act(() => {
      result.current.toggle(1);
    });
    expect(result.current.isChecked(1)).toBe(true);

    act(() => {
      result.current.toggleAll();
    });
    expect(result.current.isAllChecked()).toBe(false);

    act(() => {
      result.current.checkAll();
    });
    expect(result.current.isAllChecked()).toBe(true);

    act(() => {
      result.current.unCheckAll();
    });
    expect(result.current.getCheckedList().every(item => item.checked === false)).toBe(true);

    act(() => {
      result.current.check(1);
      result.current.check(3);
    });
    expect(result.current.getCheckedIds()).toEqual([1, 3]);
  });

  it('should preserve inserted data', () => {
    const items = [
      { id: 1, checked: false, foo: 'bar' },
      { id: 3, checked: true, baz: '3' },
      { id: 5, checked: true, cc: 'asdf' },
    ];
    const { result } = renderHook(() => useCheckList(items));

    act(() => {
      result.current.check(1);
    });

    expect(result.current.list[0]).toEqual({ id: 1, checked: true, foo: 'bar' });
  });
});
