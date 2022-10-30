import { render } from '@testing-library/react';
import { DependencyList } from 'react';
import { useRefEffect } from './useRefEffect';

const TestComponent = ({ onRef, deps }: { onRef: (element: HTMLDivElement) => void; deps: DependencyList }) => {
  const ref = useRefEffect(onRef, deps);
  return <div ref={ref} />;
};

describe('useRefEffect는', () => {
  it('마운트 시에 불린다.', () => {
    const callback = jest.fn();
    render(<TestComponent onRef={callback} deps={[]} />);
    expect(callback).toHaveBeenCalled();
    expect(callback.mock.calls[0][0] instanceof HTMLDivElement).toBe(true);
  });

  it('언마운트 시에 cleanup을 호출한다.', () => {
    const dispose = jest.fn();
    const callback = () => dispose;
    const { unmount } = render(<TestComponent onRef={callback} deps={[]} />);
    unmount();
    expect(dispose).toHaveBeenCalled();
  });

  it('cleanup은 한번만 호출한다.', () => {
    const dispose = jest.fn();
    const callback1 = () => dispose;
    const callback2 = () => undefined;
    const callback3 = () => undefined;
    const { unmount, rerender } = render(<TestComponent onRef={callback1} deps={[]} />);
    rerender(<TestComponent onRef={callback2} deps={[]} />);
    rerender(<TestComponent onRef={callback3} deps={[]} />);
    unmount();
    expect(dispose).toHaveBeenCalledTimes(1);
  });

  it('deps가 바뀌면 useEffect처럼 effect와 cleanup 모두 호출한다.', () => {
    const dispose1 = jest.fn();
    const callback1 = jest.fn(() => dispose1);

    const { unmount, rerender } = render(<TestComponent onRef={callback1} deps={[1]} />);

    const dispose2 = jest.fn();
    const callback2 = jest.fn(() => dispose2);

    rerender(<TestComponent onRef={callback2} deps={[2]} />);
    unmount();

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(dispose1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(dispose2).toHaveBeenCalledTimes(1);
  });
});
