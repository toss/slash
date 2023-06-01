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

describe('forceUpdate를 호출하여 DOM 업데이트 확인', () => {
  it('forceUpdate함수 실행 시 DOM이 업데이트 되었는가?', () => {
    render(<TestComponent />);

    expect(screen.getByText('토스')).toBeInTheDocument();

    const button = screen.getByText('토스');
    fireEvent.click(button);

    expect(screen.getByText('toss')).toBeInTheDocument();
  });
});
