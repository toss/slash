import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCallback, useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

describe('useCombinedRefs', () => {
  it('여러 개의 ref를 하나로 합칠 수 있다.', async () => {
    const refs: Array<HTMLDivElement | null | undefined> = [];
    const refCallback = jest.fn();

    function TestComponent() {
      const ref1 = useRef<HTMLDivElement>();
      const ref2 = useRef();
      const ref3 = useRef(null);
      const ref4 = useRef<HTMLDivElement>(null);
      const ref5 = useCallback((element: HTMLDivElement | null) => {
        refCallback(element);
      }, []);

      const ref = useCombinedRefs(ref1, ref2, ref3, ref4, ref5);

      return (
        <>
          <div ref={ref}>hi</div>
          <button
            onClick={() => {
              refs.push(ref1.current, ref2.current, refCallback.mock.calls[0][0]);
            }}
          >
            ref 저장하기
          </button>
        </>
      );
    }

    render(<TestComponent />);

    await userEvent.click(await screen.findByRole('button', { name: 'ref 저장하기' }));

    expect(refs.length).toEqual(3);

    expect(refs[0]).toBe(refs[1]);
    expect(refs[1]).toBe(refs[2]);
  });
});
