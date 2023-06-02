import { fireEvent, render, screen } from '@testing-library/react';

import { useState } from 'react';
import { useDidUpdate } from './useDidUpdate';

const TOSS_TEXT = 'TOSS';

interface ITestComponentProps {
  effectFn: () => void;
}

describe('useDidUpdate', () => {
  function TestingComponent({ effectFn }: ITestComponentProps) {
    const [count, setCount] = useState<number>(0);
    useDidUpdate(effectFn, [count]);

    const onClickCountUp = () => {
      setCount(count + 1);
    };

    return (
      <button type="button" onClick={onClickCountUp}>
        {TOSS_TEXT}
      </button>
    );
  }
  it('should not effect when mount', () => {
    const effectFn = jest.fn();

    expect(effectFn).not.toHaveBeenCalled();

    render(<TestingComponent effectFn={effectFn} />);
    expect(effectFn).not.toHaveBeenCalled();
  });

  it('should effect with dependency changes', () => {
    const effectFn = jest.fn();

    expect(effectFn).not.toHaveBeenCalled();

    render(<TestingComponent effectFn={effectFn} />);
    const button = screen.getByText(TOSS_TEXT);

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(effectFn).toHaveBeenCalled();

    expect(effectFn).toHaveBeenCalledTimes(3);
  });
});
