import { useIsMounted } from '@tossteam/react';
import Head from 'next/head';

interface Props {
  href: string;
}

/**
 * @name AsyncStylesheet
 * @description
 * 일반적으로 CSS는 `<head />` 요소에 포함되었을 때 완전하게 로드되기 전까지 렌더링을 block 합니다.
 * `AsyncStylesheet` 를 사용함으로써 렌더링을 blocking하지 않는 CSS를 만들 수 있습니다.
 *
 * 이럴 때에 사용하세요.
 *
 * - 폰트 파일을 로드하는 CSS를 쓰는 경우, 처음에 폰트 CSS가 로드되지 않더라도 시스템 기본 폰트로 글자를 보여주고 싶을 때
 *
 * Next.js 기반의 프로젝트에서만 사용할 수 있습니다.
 * @example
 * import { Head } from 'next/head';
 * // 렌더링을 block 하면서 CSS를 로드
 * <Head>
 *   <link rel="stylesheet" type="text/css" href="https://static.toss.im/tps/main.css" />
 * </Head>
 *
 * // 렌더링을 block 하지 않고 CSS를 로드
 * <AsyncStylesheet href="https://static.toss.im/tps/others.css" />
 * @see https://github.com/joe-bell/next-google-fonts/blob/main/src/index.tsx
 */
export default function AsyncStylesheet({ href }: Props) {
  const isMounted = useIsMounted();

  return (
    <Head>
      <link rel="preconnect" href={new URL(href).origin} />
      <link rel="preload" as="style" href={href} />
      <link rel="stylesheet" type="text/css" href={href} media={isMounted ? 'all' : 'print'} />
      <noscript>
        <link rel="stylesheet" type="text/css" href={href} />
      </noscript>
    </Head>
  );
}
