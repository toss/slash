import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { useState } from 'react';
import { useVisibilityEvent } from './useVisibilityEvent';

type VisibilityState = Document['visibilityState'];

function mockVisibilityState(visibilityState: Document['visibilityState']) {
  Object.defineProperty(document, 'visibilityState', { value: visibilityState });
  fireEvent(document, new Event('visibilitychange'));
}

describe('useVisibilityEvent', () => {
  it('When a user leaves the page', () => {
    const handleVisibilityChange = jest.fn();
    renderHook(() => useVisibilityEvent(handleVisibilityChange));

    expect(document.visibilityState).toBe('visible');

    mockVisibilityState('hidden');

    expect(handleVisibilityChange).toBeCalledWith('hidden');
  });
});

describe('useVisibilityEvent for component', () => {
  it('When a user leaves the page (component).', () => {
    function TestComponent() {
      const [visitable, setVisitable] = useState<VisibilityState>('visible');
      const handleVisibilityChange = (visibility: VisibilityState) => {
        setVisitable(visibility);
      };
      useVisibilityEvent(handleVisibilityChange);
      return <div>{visitable}</div>;
    }
    render(<TestComponent />);

    expect(screen.getByText('visible')).toBeInTheDocument();

    mockVisibilityState('hidden');

    expect(screen.getByText('hidden')).toBeInTheDocument();

    expect(document.visibilityState).toBe('hidden');
  });
});
