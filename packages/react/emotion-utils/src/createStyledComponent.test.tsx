/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { render, renderHook } from '@testing-library/react';
import React, { AllHTMLAttributes, forwardRef, useRef } from 'react';

import { createStyledComponent } from './createStyledComponent';
import { flex, FlexOptions } from './flex';
import { jsxIntrinsicElements } from './index';

type FlexType = React.ForwardRefExoticComponent<
  React.ComponentProps<typeof FlexStyledComponent> & React.RefAttributes<unknown>
>;
type TaggedFlexType = {
  [tag in keyof JSX.IntrinsicElements]: FlexType;
};

interface CreateFlex extends FlexType, TaggedFlexType {}

const FlexStyledComponent = styled(
  forwardRef((props: { tag?: keyof JSX.IntrinsicElements } & FlexOptions & AllHTMLAttributes<HTMLElement>, ref) => {
    const { tag = 'div', ...rest } = props;

    return React.createElement(tag, { ...rest, ref });
  })
)`
  ${props => flex(props.align, props.justify, props.direction)}
`;

const FlexBase = forwardRef((props: FlexOptions & AllHTMLAttributes<HTMLElement>, ref) =>
  createStyledComponent(FlexStyledComponent)({ ...props, ref })
);

const Flex = FlexBase as CreateFlex;

jsxIntrinsicElements.forEach(element => {
  Flex[element] = forwardRef((props: FlexOptions & AllHTMLAttributes<HTMLElement>, ref) =>
    createStyledComponent(FlexStyledComponent, element)[element]({ ...props, ref })
  );
});

const FlexButton = styled(Flex.button)``;

describe('createStyledComponent', () => {
  describe('tag', () => {
    it(`dot(.)으로 태그를 지정할 수 있다.`, () => {
      const { container } = render(<Flex.h1>Text Message</Flex.h1>);
      expect(container.querySelector('h1')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    it(`커스텀 props를 추가할 수 있다.`, () => {
      const { container } = render(
        <Flex.ul align="center" direction="column" justify="center">
          <Flex.li>1</Flex.li>
          <Flex.li>2</Flex.li>
          <Flex.li>3</Flex.li>
        </Flex.ul>
      );
      expect(container.querySelector('ul')).toBeInTheDocument();
      expect(container.querySelector('ul')).toHaveStyle('align-items: center');
      expect(container.querySelector('ul')).toHaveStyle('flex-direction: column');
      expect(container.querySelector('ul')).toHaveStyle('justify-content: center');
    });
  });

  describe('ref', () => {
    it(`createStyledComponent를 통해 만든 컴포넌트는 ref를 받을 수 있어야 한다`, () => {
      const {
        result: { current: ref },
      } = renderHook(() => useRef<HTMLButtonElement>(null));

      render(<Flex.button ref={ref}>Text Message</Flex.button>);

      expect(ref.current).not.toBeNull();
    });
  });

  describe('override', () => {
    it(`@emotion/styled를 통해 오버라이드 할 수 있다.`, () => {
      const { container } = render(<FlexButton disabled>Text Message</FlexButton>);
      expect(container.querySelector('button')).toBeInTheDocument();
    });
  });
});
