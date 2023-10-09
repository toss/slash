import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCallback, useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

describe('useCombinedRefs', () => {
  it('여러 개의 ref를 하나로 합칠 수 있다.', async () => {
    const user = userEvent.setup();
    const refs: Array<HTMLDivElement | null> = [];
    const callbackRef = jest.fn();

    function TestComponent() {
      const ref1 = useRef<HTMLDivElement>(null);
      const ref2 = useRef<HTMLDivElement>(null);
      const ref3 = useCallback((element: HTMLDivElement | null) => {
        callbackRef(element);
      }, []);

      const ref = useCombinedRefs(ref1, ref2, ref3);

      return (
        <>
          <div ref={ref}>hi</div>
          <button
            onClick={() => {
              refs.push(ref1.current, ref2.current, callbackRef.mock.calls[0][0]);
            }}
          >
            ref 저장하기
          </button>
        </>
      );
    }

    render(<TestComponent />);

    await user.click(await screen.findByRole('button', { name: 'ref 저장하기' }));

    expect(refs.length).toEqual(3);

    expect(refs[0]).toBe(refs[1]);
    expect(refs[1]).toBe(refs[2]);
  });
});
