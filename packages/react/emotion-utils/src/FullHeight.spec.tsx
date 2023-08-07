import { render, screen } from '@testing-library/react';
import { FullHeight } from './FullHeight';

const setInnerHeight = (height: number) => {
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
};

const CHILDREN_TEXT = 'FullHeight';

describe('FullHeight', () => {
  it('should have a default height of 768px(jsdom default value)', () => {
    render(<FullHeight>{CHILDREN_TEXT}</FullHeight>);

    const fullHeightBox = screen.getByText(CHILDREN_TEXT);

    expect(window.innerHeight).toBe(768);

    expect(fullHeightBox).toBeInTheDocument();
    expect(fullHeightBox).toHaveStyle('height: 768px');
  });

  it('should have a height of 1024px(setup value)', () => {
    setInnerHeight(1024);
    render(<FullHeight>{CHILDREN_TEXT}</FullHeight>);

    const fullHeightBox = screen.getByText(CHILDREN_TEXT);

    expect(window.innerHeight).toBe(1024);

    expect(fullHeightBox).toBeInTheDocument();
    expect(fullHeightBox).toHaveStyle('height: 1024px');
  });
});
