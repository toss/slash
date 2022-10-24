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
    render(<OpenGraph title="토스" />);
    expect(getMeta('og:title')).toEqual('토스');
  });
  it(`should render inserted description`, () => {
    render(<OpenGraph description="금융의 모든 것, 토스에서 쉽고 간편하게" />);
    expect(getMeta('og:description')).toEqual('금융의 모든 것, 토스에서 쉽고 간편하게');
  });
  it(`should render inserted imageUrl`, () => {
    render(<OpenGraph imageUrl="https://static.toss.im/homepage-static/newtoss/newtoss-og.jpg" />);
    expect(getMeta('og:image')).toEqual('https://static.toss.im/homepage-static/newtoss/newtoss-og.jpg');
  });
  it(`should throw error when no meta tag is found `, () => {
    render(<OpenGraph />);
    expect(() => getMeta('og:title')).toThrowError();
  });
});
