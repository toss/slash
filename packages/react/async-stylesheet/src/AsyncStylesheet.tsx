/** @tossdocs-ignore */
import { useIsMounted } from '@toss/react';
import Head from 'next/head';

interface Props {
  href: string;
}

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
