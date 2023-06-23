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

describe('Test Portal Component', () => {
  it("If the id of the DOM Node added outside the parent component's DOM hierarchy is the same, it is rendered as a child of that Node.", () => {
    const { container } = render(<TestComponent id="outer" />);

    const parent = container.querySelector('#parent');
    const outer = container.querySelector('#outer');

    const parentChildren = parent?.querySelector('#child');
    const outerChildren = outer?.querySelector('#child');

    expect(parentChildren).not.toBeInTheDocument();
    expect(outerChildren).toBeInTheDocument();
  });

  it("If the id of the DOM Node added outside of the parent component's DOM hierarchy is different, it will not be rendered as a child of that Node, but will be rendered as a child of the parent component.", () => {
    const { container } = render(<TestComponent id="etc" />);

    const parent = container.querySelector('#parent');
    const outer = container.querySelector('#outer');

    const parentChildren = parent?.querySelector('#child');
    const outerChildren = outer?.querySelector('#child');

    expect(parentChildren).toBeInTheDocument();
    expect(outerChildren).not.toBeInTheDocument();
  });
});
