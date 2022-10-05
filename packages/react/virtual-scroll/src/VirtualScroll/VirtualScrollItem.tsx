/** @tossdocs-ignore */
import { ReactNode, CSSProperties } from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

interface Props extends DivProps {
  key: string | number;
  height: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * @deprecated v18에서 제거 예정
 */
export default function VirtualTreeItem({ className, style, children, ...divProps }: Props) {
  return (
    <div className={className} style={style} {...divProps}>
      {children}
    </div>
  );
}
