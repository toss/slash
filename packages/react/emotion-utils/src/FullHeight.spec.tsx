import { render, screen } from '@testing-library/react';
import { FullHeight } from './FullHeight';

const setInnerHeight = (height: number) => {
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
};

describe('FullHeight', () => {
  it('should have height 768px', () => {
    render(<FullHeight>FullHeight</FullHeight>);

    const fullHeightBox = screen.getByText('FullHeight');

    expect(window.innerHeight).toBe(768);

    expect(fullHeightBox).toBeInTheDocument();
    expect(fullHeightBox).toHaveStyle('height: 768px');
  });

  it('should have height 1024px', () => {
    setInnerHeight(1024);
    render(<FullHeight>FullHeight</FullHeight>);

    const fullHeightBox = screen.getByText('FullHeight');

    expect(window.innerHeight).toBe(1024);

    expect(fullHeightBox).toBeInTheDocument();
    expect(fullHeightBox).toHaveStyle('height: 1024px');
  });
});
