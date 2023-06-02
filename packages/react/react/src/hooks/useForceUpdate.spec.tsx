import { fireEvent, render, screen } from '@testing-library/react';
import { useCallback, useRef } from 'react';
import { useForceUpdate } from './useForceUpdate';

function TestComponent() {
  const forceUpdate = useForceUpdate();

  const testRef = useRef<string>('토스');

  const onClickTestRefUpdate = useCallback(() => {
    testRef.current = 'toss';
    forceUpdate();
  }, [forceUpdate]);

  return (
    <div>
      <button onClick={onClickTestRefUpdate}>{testRef.current}</button>
    </div>
  );
}

describe('forceUpdate', () => {
  it('force-rerenders the component', () => {
    render(<TestComponent />);

    expect(screen.getByText('토스')).toBeInTheDocument();

    const button = screen.getByText('토스');
    fireEvent.click(button);

    expect(screen.getByText('toss')).toBeInTheDocument();
  });
});
