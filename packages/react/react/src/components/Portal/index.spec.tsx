import { render } from '@testing-library/react';
import { Portal } from './Portal';

const TestComponent = ({ id }: { id: string }) => {
  return (
    <>
      <div id="parent">
        <Portal id={id}>
          <div id="child">Example Portal</div>
        </Portal>
      </div>
      <div id="outer"></div>
    </>
  );
};

describe('Portal', () => {
  it("If the ID of a DOM Node added outside of the parent component's DOM hierarchy is the same as the ID added with the Portal Component props, the Portal Component's Children are rendered as children of the external DOM Node.", () => {
    const { container } = render(<TestComponent id="outer" />);

    const parent = container.querySelector('#parent');
    const outer = container.querySelector('#outer');

    const parentChildren = parent?.querySelector('#child');
    const outerChildren = outer?.querySelector('#child');

    expect(parentChildren).not.toBeInTheDocument();
    expect(outerChildren).toBeInTheDocument();
  });

  it("If the ID of a DOM Node added outside of the parent component's DOM hierarchy is different from the ID added with the Portal Component props, the Portal Component's Children are rendered as children of the parent component.", () => {
    const { container } = render(<TestComponent id="etc" />);

    const parent = container.querySelector('#parent');
    const outer = container.querySelector('#outer');

    const parentChildren = parent?.querySelector('#child');
    const outerChildren = outer?.querySelector('#child');

    expect(parentChildren).toBeInTheDocument();
    expect(outerChildren).not.toBeInTheDocument();
  });
});
