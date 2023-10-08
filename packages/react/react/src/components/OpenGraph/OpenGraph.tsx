import { ComponentType, Fragment } from 'react';

interface Props {
  container?: ComponentType<any>;
  title?: string;
  description?: string;
  imageUrl?: string;
}

/** @tossdocs-ignore */
export function OpenGraph({ container: Container = Fragment, title, description, imageUrl }: Props) {
  return (
    <Container>
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
    </Container>
  );
}
