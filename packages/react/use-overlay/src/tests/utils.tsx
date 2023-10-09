/** @tossdocs-ignore */
import { Queries, queries, render, RenderOptions } from '@testing-library/react';
import { Fragment } from 'react';
import { OverlayProvider } from '../OverlayProvider';

export function renderWithContext<
  Q extends Queries = typeof queries,
  C extends Element | DocumentFragment = HTMLElement
>(ui: React.ReactElement, options: RenderOptions<Q, C> = {}) {
  return render<Q, C>(ui, {
    ...options,
    wrapper: ({ children }) => {
      const Wrapper = options.wrapper ?? Fragment;

      return (
        <Wrapper>
          <OverlayProvider>{children}</OverlayProvider>
        </Wrapper>
      );
    },
  });
}
