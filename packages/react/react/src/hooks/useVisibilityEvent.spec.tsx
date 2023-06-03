import { fireEvent, render, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { useVisibilityEvent } from './useVisibilityEvent';

type VisibilityState = Document['visibilityState'];

describe('useVisibilityEvent', () => {
  it('When a user leaves the page.', () => {
    const callbackMock = jest.fn();
    renderHook(() => useVisibilityEvent(callbackMock));
    expect(document.visibilityState).toBe('visible');

    Object.defineProperty(document, 'visibilityState', { value: 'hidden' });
    fireEvent(document, new Event('visibilitychange'));

    expect(document.visibilityState).toBe('hidden');
  });
});

describe('useVisibilityEvent for component', () => {
  it('When a user leaves the page (component).', () => {
    function TestComponent() {
      const [visitable, setVisitable] = useState<VisibilityState>('visible');
      const visibleCallbackFunc = (visibilit: VisibilityState) => {
        setVisitable(visibilit);
      };
      useVisibilityEvent(visibleCallbackFunc);
      return <div>{visitable}</div>;
    }
    const { getByText } = render(<TestComponent />);

    expect(getByText('visible')).toBeInTheDocument();

    Object.defineProperty(document, 'visibilityState', { value: 'hidden' });
    fireEvent(document, new Event('visibilitychange'));

    expect(getByText('hidden')).toBeInTheDocument();

    expect(document.visibilityState).toBe('hidden');
  });
});
