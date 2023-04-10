/** @jsxImportSource react */
import classnames from 'classnames';
import { ComponentType, HTMLAttributes, ReactNode } from 'react';
import Style, { generateClassNames } from '../../utils/Style';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props {
  /**
   * @default 'h1'
   */
  as?: HeadingType;
  className?: string;
  children?: ReactNode;
  id?: string;
}

/** @tossdocs-ignore */
export function HiddenHeading({ as = 'h1', id, className, children }: Props) {
  const Heading = as as unknown as ComponentType<HTMLAttributes<HTMLHeadingElement>>;

  return (
    <Style css={css}>
      <Heading id={id} className={classnames(className, CLASSNAMES.hiddenHeading)}>
        {children}
      </Heading>
    </Style>
  );
}

const CLASSNAMES = generateClassNames({
  hiddenHeading: 'hidden-heading',
});

const css = `
  .${CLASSNAMES.hiddenHeading} {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    border: 0;
    clip: rect(0, 0, 0, 0);
  }
`;
