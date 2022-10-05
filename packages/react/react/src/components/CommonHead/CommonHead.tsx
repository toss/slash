/** @jsxImportSource react */
import { LOTTIE_URL } from '../../utils/importLottie';
import { Fragment, memo } from 'react';

interface Props {
  container?: React.ComponentType<any>;
}
/**
 * @description
 * 토스 웹에서 사용하는 공통 Head 컴포넌트입니다.
 * - 해당 컴포넌트에는 각종 meta 태그와 link (preload, preconnect, favicon)이 포함되어 있습니다.
 * - TossNextApp 에 내장되어 있는 컴포넌트입니다.
 *
 * @example
 * <CommonHead container={Head} />
 */
function CommonHead({ container: Container = Fragment }: Props) {
  return (
    <Container>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
      />
      <meta name="author" content="Viva Republica" />
      <link rel="preconnect" href="https://toss.im" />
      <link rel="preconnect" href="https://api-gateway.toss.im:11099" />
      <link rel="preconnect" href="https://api-public.toss.im" />
      <link rel="preconnect" href="https://static.toss.im" />
      <link rel="preconnect" href="https://polyfill-fe.toss.im" />
      <link rel="preconnect" href="https://assets-fe.toss.im" />
      <link rel="shortcut icon" href="https://static.toss.im/tds/favicon/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="https://static.toss.im/tds/favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="https://static.toss.im/tds/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="https://static.toss.im/tds/favicon/favicon-48x48.png" />
      <link rel="icon" type="image/png" sizes="196x196" href="https://static.toss.im/tds/favicon/favicon-196x196.png" />
      <link rel="apple-touch-icon" sizes="57x57" href="https://static.toss.im/tds/favicon/apple-touch-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="https://static.toss.im/tds/favicon/apple-touch-icon-72x72.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="https://static.toss.im/tds/favicon/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="https://static.toss.im/tds/favicon/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="https://static.toss.im/tds/favicon/apple-touch-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="https://static.toss.im/tds/favicon/apple-touch-icon-152x152.png"
      />
      <meta name="msapplication-TileImage" content="https://static.toss.im/tds/favicon/mstile-144x144.png" />
      <link rel="preload" href={LOTTIE_URL} as="script" />
    </Container>
  );
}

export default memo(CommonHead);
