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
      {title !== undefined && <meta property="og:title" content={title} />}
      {description !== undefined && <meta property="og:description" content={description} />}
      {imageUrl !== undefined && <meta property="og:image" content={imageUrl} />}
    </Container>
  );
}
