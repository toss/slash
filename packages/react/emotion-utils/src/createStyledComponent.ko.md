---
title: flex
---

# createStyledComponent

스타일이 정의된 컴포넌트를 생성하기 위한 유틸리티

```ts
type StyledBaseType<P> = StyledComponent<{ tag?: keyof JSX.IntrinsicElements } & P & AllHTMLAttributes<HTMLElement>>;

function createStyledComponent<P>(
  StyledBase: StyledBaseType<P>
): ({ ...rest }: React.ComponentProps<StyledBaseType<P>>) => React.ReactElement;

function createStyledComponent<P>(
  StyledBase: StyledBaseType<P>,
  tag: keyof JSX.IntrinsicElements
): {
  [tag in keyof JSX.IntrinsicElements]: ({ ...rest }: React.ComponentProps<StyledBaseType<P>>) => React.ReactElement;
};
```

## Examples

```ts
######## Define Component ########
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

######## Use Component ########
import { Flex } from './';
import styled from '@emotion/styled';

const FlexULList = styled(Flex.ul)``
const FlexLIItem = styled(Flex)``

const Page = () => {
   return (
     <FlexULList align="center">
          <FlexLIItem.li>hi</FlexLIItem.li>
          <Flex.li>hi</Flex.li>
     </FlexULList>
   )
}
```
