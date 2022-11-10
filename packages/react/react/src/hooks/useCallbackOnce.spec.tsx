import { render } from '@testing-library/react';
import { DependencyList, useEffect } from 'react';
import { useCallbackOnce } from './useCallbackOnce';

const TestComponent = <F extends (...args: any[]) => void>({
  callback,
  deps,
}: {
  callback: F;
  deps: DependencyList;
}) => {
  const onceCallback = useCallbackOnce((...args: any[]) => callback(...args), deps);

  useEffect(
    (...args: Parameters<F>) => {
      onceCallback(...args);
    },
    [onceCallback]
  );

  return <div />;
};

describe('useCallbackOnce', () => {
  it('should be called one time when mount', () => {
    const callback = jest.fn();
    render(<TestComponent callback={callback} deps={[]} />);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not be called more than once when rerender', () => {
    const callback = jest.fn();
    const { rerender } = render(<TestComponent callback={callback} deps={[1]} />);

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={callback} deps={[2]} />);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).not.toHaveBeenCalledTimes(2);
  });
});
