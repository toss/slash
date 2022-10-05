/** @jsxImportSource @emotion/react */
import { render } from '@testing-library/react';

import { SafeArea } from './SafeArea';

describe('SafeArea', () => {
  describe('as', () => {
    it(`SafeArea는 Fragment로 렌더링된다`, () => {
      const { container } = render(
        <SafeArea>
          <p>Text Message</p>
        </SafeArea>
      );
      expect(container.childElementCount).toBe(3);
    });

    it(`SafeArea는 as를 통해 as의 태그로 렌더링된다`, () => {
      const { container } = render(
        <SafeArea as="a" href="asdf" data-testid="root">
          <p>Text Message</p>
        </SafeArea>
      );

      expect(container.childElementCount).toBe(1);
      expect(container.querySelector('a')).toBeInTheDocument();
    });
  });
});
