/** @tossdocs-ignore */
import { AllHTMLAttributes } from 'react';

type Props<Element extends keyof JSX.IntrinsicElements = 'span'> = {
  as?: Element;
} & Omit<AllHTMLAttributes<Element>, 'as'>;

export function ScreenReaderOnly({ as: Component = 'span', children, ...props }: Props) {
  return (
    <Component
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        borderWidth: 0,
        clip: 'rect(0 0 0 0)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
      {...(props as any)}
    >
      {children}
    </Component>
  );
}

export default ScreenReaderOnly;
