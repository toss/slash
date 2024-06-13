import { render, screen } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { OpenGraph } from '.';

describe('OpenGraph', () => {
  const getMetaContent = (metaName: string, container: HTMLElement | Document = document) => {
    const metaCollection = container.getElementsByTagName('meta');

    for (const meta of metaCollection) {
      if (meta.getAttribute('property') === metaName) {
        return meta.getAttribute('content');
      }
    }
    throw new Error('cannot find your meta tag');
  };

  it('should render inserted title', () => {
    const title = 'toss';

    render(<OpenGraph title={title} />);
    expect(getMetaContent('og:title')).toEqual(title);
  });

  it('should render inserted description', () => {
    const description = 'Every moment in finance, made easy with Toss';

    render(<OpenGraph description={description} />);
    expect(getMetaContent('og:description')).toEqual(description);
  });

  it('should render inserted imageUrl', () => {
    const imageUrl = 'https://static.toss.im/homepage-static/newtoss/newtoss-og.jpg';

    render(<OpenGraph imageUrl={imageUrl} />);
    expect(getMetaContent('og:image')).toEqual(imageUrl);
  });

  it('should throw error when no meta tag is found ', () => {
    render(<OpenGraph />);
    expect(() => getMetaContent('og:title')).toThrowError();
  });

  it('should have a meta tag inside the container', () => {
    const title = 'toss';

    const TestContainer = ({ children }: PropsWithChildren) => {
      return <div role="container">{children}</div>;
    };

    render(<OpenGraph container={TestContainer} title={title} />);

    const container = screen.getByRole('container');

    expect(getMetaContent('og:title', container)).toEqual(title);
  });
});
