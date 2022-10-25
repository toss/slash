import { render } from '@testing-library/react';
import { OpenGraph } from '.';

describe('OpenGraph', () => {
  const getMeta = (metaName: string) => {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i += 1) {
      if (metas[i].getAttribute('property') === metaName) {
        return metas[i].getAttribute('content');
      }
    }
    throw new Error('cannot find your meta tag');
  };
  it(`should render inserted title`, () => {
    const title = '토스';
    render(<OpenGraph title={title} />);
    expect(getMeta('og:title')).toEqual(title);
  });
  it(`should render inserted description`, () => {
    const description = '금융의 모든 것, 토스에서 쉽고 간편하게';
    render(<OpenGraph description={description} />);
    expect(getMeta('og:description')).toEqual(description);
  });
  it(`should render inserted imageUrl`, () => {
    const imageUrl = 'https://static.toss.im/homepage-static/newtoss/newtoss-og.jpg';
    render(<OpenGraph imageUrl={imageUrl} />);
    expect(getMeta('og:image')).toEqual(imageUrl);
  });
  it(`should throw error when no meta tag is found `, () => {
    render(<OpenGraph />);
    expect(() => getMeta('og:title')).toThrowError();
  });
});
