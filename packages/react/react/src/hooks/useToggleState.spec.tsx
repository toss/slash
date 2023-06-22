import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { useToggleState } from './useToggleState';

const TestComponent = () => {
  const [bool, toggle] = useToggleState(false);

  return (
    <div>
      <div role={'textbox'}>{`${bool}`}</div>
      <button onClick={toggle}>button</button>
    </div>
  );
};

describe('useToggleState', () => {
  describe('Return Value Type Check ', () => {
    const { result } = renderHook(useToggleState);

    const [bool, toggle] = result.current;

    it('The type of bool is boolean.', () => {
      expect(typeof bool).toBe('boolean');
    });

    it('The toggle type is function.', () => {
      expect(typeof toggle).toBe('function');
    });
  });

  describe('Check Initial Value', () => {
    it('Default argument is false, and the return value is false.', () => {
      const { result } = renderHook(() => useToggleState());
      const [bool] = result.current;

      expect(bool).toBe(false);
    });

    it('If the argument is false, the return value is also false.', () => {
      const { result } = renderHook(() => useToggleState(false));
      const [bool] = result.current;

      expect(bool).toBe(false);
    });

    it('If the argument is true, the return value is also true.', () => {
      const { result } = renderHook(() => useToggleState(true));
      const [bool] = result.current;

      expect(bool).toBe(true);
    });
  });

  describe('Execute toggle', () => {
    it('When toggle is executed, the value of bool changes from true to false, or from false to true.', () => {
      render(<TestComponent />);

      const button = screen.getByRole('button');
      const textBox = screen.getByRole('textbox');

      expect(textBox).toHaveTextContent('false');

      fireEvent.click(button);

      expect(textBox).toHaveTextContent('true');

      fireEvent.click(button);

      expect(textBox).toHaveTextContent('false');

      fireEvent.click(button);

      expect(textBox).toHaveTextContent('true');
    });
  });
});
