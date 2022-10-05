/** @jsxImportSource @emotion/react */

import { render, renderHook } from '@testing-library/react';
import { useRef } from 'react';

import { Flex } from './flex';

describe('Flex', () => {
  describe('as', () => {
    it(`Flex는 div로 렌더링된다`, () => {
      const { container } = render(<Flex data-testid="root">Text Message</Flex>);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it(`Flex의 as를 통해 as의 태그로 렌더링된다`, () => {
      const { container } = render(
        <Flex as="a" href="asdf" data-testid="root">
          Text Message
        </Flex>
      );
      expect(container.querySelector('a')).toBeInTheDocument();
    });
  });

  describe('ref', () => {
    it(`Flex는 ref를 받을 수 있어야 한다`, () => {
      const {
        result: { current: ref },
      } = renderHook(() => useRef<HTMLButtonElement>(null));

      render(
        <Flex data-testid="root" as="button" ref={ref}>
          Text Message
        </Flex>
      );

      expect(ref.current).not.toBeNull();
    });
  });
});
