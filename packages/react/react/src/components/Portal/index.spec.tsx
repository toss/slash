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
  it("If the ID passed as a property to the Portal Component matches the ID of a DOM element outside of the parent component's hierarchy, the Portal Component's child component is rendered to that external DOM element.", () => {
    const { container } = render(<TestComponent id="outer" />);

    const parent = container.querySelector('#parent');
    const outer = container.querySelector('#outer');

    const parentChildren = parent?.querySelector('#child');
    const outerChildren = outer?.querySelector('#child');

    expect(parentChildren).not.toBeInTheDocument();
    expect(outerChildren).toBeInTheDocument();
  });

  it("If the ID passed as a property to the Portal Component does not match the ID of a DOM element outside of the parent component's hierarchy, the Portal Component's child component is rendered to the parent component.", () => {
    const { container } = render(<TestComponent id="etc" />);

    const parent = container.querySelector('#parent');
    const outer = container.querySelector('#outer');

    const parentChildren = parent?.querySelector('#child');
    const outerChildren = outer?.querySelector('#child');

    expect(parentChildren).toBeInTheDocument();
    expect(outerChildren).not.toBeInTheDocument();
  });
});
