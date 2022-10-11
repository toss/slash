/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { HTMLAttributes, ReactNode, useEffect, useLayoutEffect, useState } from 'react';

declare const global: unknown;
const isServer = () => typeof window === 'undefined' && typeof global !== 'undefined';
const useIsomorphicLayoutEffect = isServer() ? useEffect : useLayoutEffect;

/**
 * @name FullHeight
 * @description
 * height가 `window.innerHeight`인 div 컨테이너입니다.
 * CSR일 때 `useLayoutEffect`를 통해 `height`가 지정됩니다.
 *
 * 모바일 화면을 꽉 채우는 페이지를 구현할 때 유용합니다.
 *
 * @example
 * <FullHeight>
 *   <Foo />
 * </FullHeight>
 */
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
