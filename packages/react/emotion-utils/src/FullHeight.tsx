/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { isServer } from '@toss/utils';
import { HTMLAttributes, ReactNode, useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect = isServer() ? useEffect : useLayoutEffect;

export function FullHeight({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  const [height, setHeight] = useState(0);

  useIsomorphicLayoutEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <div
      css={css`
        height: ${height}px;
        overflow: hidden;
      `}
      {...props}
    >
      {children}
    </div>
  );
}
