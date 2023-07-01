import { render } from '@testing-library/react';
import { useRef } from 'react';
import { Portal } from './Portal';

const DefaultTestComponent = () => {
  return (
    <div id="parent">
      <Portal>
        <p className="child">Default Portal</p>
      </Portal>
    </div>
  );
};

const ContainerTestComponent = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div id="parent">
      <Portal containerRef={ref}>
        <p className="child">Default Portal</p>
      </Portal>

      <div id="outer" ref={ref}></div>
    </div>
  );
};

const NestedTestComponent = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div id="parent">
      <Portal>
        <p className="child">Default Portal</p>
        <Portal>
          <p className="nested-child-1">Nested Portal1</p>
          <Portal containerRef={ref}>
            <p className="nested-child-2">Nested Portal2</p>
          </Portal>
        </Portal>
      </Portal>

      <div id="outer" ref={ref}></div>
    </div>
  );
};

describe('Portal', () => {
  describe('DefaultTest', () => {
    it("The Portal Component will render the portal node in 'document.body' by default unless you pass in the 'containerRef' prop. The id value for that portal node defaults to 'portal'.", () => {
      const { container } = render(<DefaultTestComponent />);

      const parentNode = container.querySelector('#parent');
      const parentPortal = parentNode?.querySelector('.portal');

      expect(parentPortal).toBeNull();

      const documentPortal = document.querySelector('.portal');
      const documentPortalChild = documentPortal?.querySelector('.child');

      expect(documentPortalChild).toBeInTheDocument();
    });
  });

  describe('ContainerTest', () => {
    it("By passing in the Portal Component's 'containerRef' prop, you can render to any other DOM node you want instead of the 'document.body'.", () => {
      const { container } = render(<ContainerTestComponent />);

      const outerNode = container.querySelector('#outer');
      const outerInnerPortal = outerNode?.querySelector('.portal');
      const outerInnerChild = outerInnerPortal?.querySelector('.child');

      expect(outerInnerChild).toBeInTheDocument();
    });
  });

  describe('NestedTest', () => {
    it('Nesting multiple Portal Components creates a nested Portal DOM hierarchy.', () => {
      const { container } = render(<NestedTestComponent />);

      const parentNode = container.querySelector('#parent');
      const parentPortal = parentNode?.querySelector('.portal');

      expect(parentPortal).toBeNull();

      const documentPortal = document.querySelector('.portal');
      const documentPortalChild = documentPortal?.querySelector('.child');

      expect(documentPortalChild).toBeInTheDocument();

      const nestedPortal1 = documentPortal?.querySelector('.portal');
      const nestedChild1 = nestedPortal1?.querySelector('.nested-child-1');

      expect(nestedChild1).toBeInTheDocument();

      const nestedPortal2 = nestedPortal1?.querySelector('.portal');
      const nestedChild2 = nestedPortal2?.querySelector('.nested-child-2');

      expect(nestedChild2).toBeInTheDocument();
    });

    it('If a nested Portal Component has a containerRef, it will still be rendered to the parent Portal Component.', () => {
      const { container } = render(<NestedTestComponent />);

      const outerNode = container.querySelector('#outer');
      const outerPortal = outerNode?.querySelector('.portal');

      expect(outerPortal).toBeNull();
    });
  });
});
