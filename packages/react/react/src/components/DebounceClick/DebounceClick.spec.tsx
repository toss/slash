import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DebounceClick } from './DebounceClick';

interface TestButtonProps {
  children: React.ReactNode;
  onCTAClick: () => void;
}

const COMPLETION_WAIT_TIME = 500;
const BEFORE_COMPLETION_TIME = 490;
const REMAINING_TIME = 10;

const TestButton = ({ children, onCTAClick }: TestButtonProps) => {
  return <button onClick={onCTAClick}>{children}</button>;
};

beforeAll(() => {
  jest.useFakeTimers();
});

describe('DebounceClick', () => {
  it('should debounce "onClick" event prop passed to child element by default', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFn = jest.fn();

    render(
      <DebounceClick wait={COMPLETION_WAIT_TIME}>
        <button onClick={mockFn}>Button</button>
      </DebounceClick>
    );

    const button = screen.getByRole('button');

    await user.click(button);

    jest.advanceTimersByTime(BEFORE_COMPLETION_TIME);
    expect(mockFn).toBeCalledTimes(0);

    jest.advanceTimersByTime(REMAINING_TIME);
    expect(mockFn).toBeCalledTimes(1);

    await user.click(button);

    jest.advanceTimersByTime(BEFORE_COMPLETION_TIME);
    expect(mockFn).toBeCalledTimes(1);

    jest.advanceTimersByTime(REMAINING_TIME);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('should debounce event prop of child element with the same name as capture', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFn = jest.fn();

    render(
      <DebounceClick capture="onCTAClick" wait={COMPLETION_WAIT_TIME}>
        <TestButton onCTAClick={mockFn}>Button</TestButton>
      </DebounceClick>
    );

    const button = screen.getByRole('button');

    await user.click(button);

    jest.advanceTimersByTime(BEFORE_COMPLETION_TIME);
    expect(mockFn).toBeCalledTimes(0);

    jest.advanceTimersByTime(REMAINING_TIME);
    expect(mockFn).toBeCalledTimes(1);

    await user.click(button);

    jest.advanceTimersByTime(BEFORE_COMPLETION_TIME);
    expect(mockFn).toBeCalledTimes(1);

    jest.advanceTimersByTime(REMAINING_TIME);
    expect(mockFn).toBeCalledTimes(2);
  });
});
