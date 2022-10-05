/** @tossdocs-ignore */
import { ReactNode, ReactElement } from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

interface Props extends DivProps {
  key: string | number;
  height: number;
  header: ReactElement;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * @deprecated v18에서 제거 예정
 */
export default function VirtualScrollGroup({ className, style, header, ...divProps }: Props) {
  return (
    <div className={className} style={style} {...divProps}>
      {header}
    </div>
  );
}
