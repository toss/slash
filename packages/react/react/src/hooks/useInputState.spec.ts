import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { createElement } from 'react';

import { useInputState } from './useInputState';

function createTestInput(...params: Parameters<typeof useInputState>) {
  return function Input() {
    const [value, handleValueChange] = useInputState(...params);

    return createElement('input', {
      role: 'input',
      type: 'text',
      value,
      onChange: handleValueChange,
    });
  };
}

describe('`useInputState`', () => {
  describe('반환 값 타입 체크', () => {
    const { result } = renderHook(useInputState);

    const [value, handleValueChange] = result.current;

    it('value의 타입은 string이다.', () => {
      expect(typeof value).toBe('string');
    });

    it('handleValueChange의 타입은 function이다.', () => {
      expect(typeof handleValueChange).toBe('function');
    });
  });

  describe('초기값', () => {
    it(`디폴트 인자는 ''<empty string>으로 반환값은 ''이다.`, () => {
      const { result } = renderHook(useInputState);
      const [value] = result.current;

      expect(value).toBe('');
    });

    it('input 요소 값이 변경되기 전까지는 인자로 전달된 값을 반환한다.', () => {
      const {
        result: {
          current: [v1],
        },
      } = renderHook(() => useInputState('some-value'));

      expect(v1).toBe('some-value');

      const {
        result: {
          current: [v2],
        },
      } = renderHook(() => useInputState('other-value'));

      expect(v2).toBe('other-value');
    });
  });

  describe('이벤트 발생', () => {
    afterEach(cleanup);

    it('change 이벤트 발생 시, `value`가 변경된다.', () => {
      const { getByRole } = render(createElement(createTestInput()));
      const input = getByRole('input') as HTMLInputElement;

      expect(input.value).toBe('');

      fireEvent.change(input, { target: { value: 'changed' } });

      expect(input.value).toBe('changed');

      fireEvent.change(input, { target: { value: 'one more changed' } });

      expect(input.value).toBe('one more changed');
    });
  });

  describe('transformValue 옵션', () => {
    afterEach(cleanup);

    it('transformValue 함수에 따라 값을 변경한다.', () => {
      const { getByRole } = render(createElement(createTestInput('', v => v.toLowerCase())));

      const input = getByRole('input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'MUST BE LOWERCASE' } });

      expect(input.value).toBe('must be lowercase');
    });
  });
});
