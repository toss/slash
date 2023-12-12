/** @jsxImportSource @emotion/react */

import { render, renderHook } from '@testing-library/react';
import { useRef } from 'react';

import { Flex } from './flex';

describe('Flex', () => {
  describe('as', () => {
    it(`should render as a div.`, () => {
      const { container } = render(<Flex data-testid="root">Text Message</Flex>);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it(`should render as a span tag through 'as' in Flex.`, () => {
      const { container } = render(
        <Flex as="span" data-testid="root">
          Text Message
        </Flex>
      );
      expect(container.querySelector('span')).toBeInTheDocument();
    });
  });

  describe('align', () => {
    it(`should be 'stretch' by default for 'align' in Flex.`, () => {
      const { container } = render(<Flex data-testid="root">Text Message</Flex>);
      expect(container.querySelector('div')).toHaveStyle('align-items: stretch');
    });

    it(`should not default to 'flex-start' for 'align' in Flex.`, () => {
      const { container } = render(<Flex data-testid="root">Text Message</Flex>);
      expect(container.querySelector('div')).not.toHaveStyle('align-items: flex-start');
    });

    it(`should be 'center' for 'align' in Flex.`, () => {
      const { container } = render(
        <Flex align="center" data-testid="root">
          Text Message
        </Flex>
      );
      expect(container.querySelector('div')).toHaveStyle('align-items: center');
    });
  });

  describe('justify', () => {
    it(`should be 'flex-start' by default for 'justify' in Flex.`, () => {
      const { container } = render(<Flex data-testid="root">Text Message</Flex>);
      expect(container.querySelector('div')).toHaveStyle('justify-content: flex-start');
    });

    it(`should not default to 'flex-end' for 'justify' in Flex.`, () => {
      const { container } = render(<Flex data-testid="root">Text Message</Flex>);
      expect(container.querySelector('div')).not.toHaveStyle('justify-content: flex-end');
    });

    it(`should be 'center' for 'justify' in Flex.`, () => {
      const { container } = render(
        <Flex justify="center" data-testid="root">
          Text Message
        </Flex>
      );
      expect(container.querySelector('div')).toHaveStyle('justify-content: center');
    });
  });

  describe('direction', () => {
    it(`should be 'row' by default for 'direction' in Flex.`, () => {
      const { container } = render(<Flex data-testid="root">Text Message</Flex>);
      expect(container.querySelector('div')).toHaveStyle('flex-direction: row');
    });

    it(`should be 'column' for 'direction' in Flex.`, () => {
      const { container } = render(
        <Flex direction="column" data-testid="root">
          Text Message
        </Flex>
      );
      expect(container.querySelector('div')).toHaveStyle('flex-direction: column');
    });
  });

  describe('ref', () => {
    it(`should be able to accept a ref in Flex.`, () => {
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
