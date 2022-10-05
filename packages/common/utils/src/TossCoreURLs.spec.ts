import { isTossCoreURL, isTossScheme, TossCoreURLs } from './TossCoreURLs';

describe('TossCoreURLs', () => {
  describe('ensure()는', () => {
    it('toss.im 주소 또는 토스 앱 스킴에 대해서 값을 그대로 반환한다.', () => {
      expect(TossCoreURLs.ensure('https://toss.im/')).toBe('https://toss.im/');
      expect(TossCoreURLs.ensure('https://service.toss.im/foo')).toBe('https://service.toss.im/foo');

      const scheme1 = `supertoss://lab?url=${encodeURIComponent('https://toss.im')}`;
      expect(TossCoreURLs.ensure(scheme1)).toBe(scheme1);

      const scheme2 = `servicetoss://foo`;
      expect(TossCoreURLs.ensure(scheme2)).toBe(scheme2);
    });

    it('naver.com 등 올바르지 않은 주소에 대해서는 throw한다.', () => {
      expect(() => TossCoreURLs.ensure('https://naver.com/')).toThrow();
      expect(() => TossCoreURLs.ensure('https://mytoss.im/')).toThrow();
      expect(() => TossCoreURLs.ensure('mytoss://foobar')).toThrow();
    });

    describe('주어진 경로가 절대 경로이면', () => {
      it('window.location.origin이 toss.im 도메인이면 그대로 반환한다.', () => {
        mockWindowLocation({
          href: 'https://toss.im/foo',
        });

        expect(TossCoreURLs.ensure('/foo')).toBe('/foo');
        expect(TossCoreURLs.ensure('/foo/bar')).toBe('/foo/bar');
        expect(TossCoreURLs.ensure('/foo/bar?q=1')).toBe('/foo/bar?q=1');
      });

      it('window.location.origin이 toss.im 도메인이 아니면 throw한다.', () => {
        mockWindowLocation({
          href: 'https://mytoss.im/foo',
        });

        expect(() => TossCoreURLs.ensure('/foo')).toThrow();
        expect(() => TossCoreURLs.ensure('/foo/bar')).toThrow();
        expect(() => TossCoreURLs.ensure('/foo/bar?q=1')).toThrow();
      });
    });
  });

  describe('navigateTo()는', () => {
    it('toss.im 주소에 대해서 잘 이동한다.', () => {
      mockWindowLocation({
        href: 'https://toss.im',
      });

      const target = 'https://service.toss.im';
      TossCoreURLs.navigateTo(target);

      expect(window.location.href).toEqual(target);
    });

    it('supertoss 스킴에 대해서 잘 이동한다.', () => {
      mockWindowLocation({
        href: 'https://toss.im',
      });

      const target = 'supertoss://my-insurance';
      TossCoreURLs.navigateTo(target);

      expect(window.location.href).toEqual(target);
    });

    it('servicetoss 스킴에 대해서 잘 이동한다.', () => {
      mockWindowLocation({
        href: 'https://toss.im',
      });

      const target = 'servicetoss://my-insurance';
      TossCoreURLs.navigateTo(target);

      expect(window.location.href).toEqual(target);
    });

    it('올바르지 않은 이동에 대해 throw한다.', () => {
      mockWindowLocation({
        href: 'https://toss.im',
      });

      expect(() => TossCoreURLs.navigateTo('https://naver.com')).toThrow();
      expect(() => TossCoreURLs.navigateTo('javascript:alert(1);')).toThrow();

      expect(window.location.href).toEqual('https://toss.im');
    });
  });
});

describe('isTossCoreURL', () => {
  it('toss.im 또는 그 하위 도메인에 대해서만 true를 반환한다.', () => {
    expect(isTossCoreURL('https://toss.im')).toBe(true);
    expect(isTossCoreURL('https://service.toss.im')).toBe(true);
    expect(isTossCoreURL('https://static.fe.toss.im')).toBe(true);
    expect(isTossCoreURL('https://mytoss.im')).toBe(false);
    expect(isTossCoreURL('https://naver.com')).toBe(false);
  });
});

describe('isTossScheme', () => {
  it('supertoss, servicetoss 스킴에 대해서만 true를 반환한다.', () => {
    expect(isTossScheme('supertoss://main')).toBe(true);
    expect(isTossScheme('supertoss-live://main')).toBe(true);
    expect(isTossScheme('supertoss-staging://main')).toBe(true);
    expect(isTossScheme('supertoss-alpha://main')).toBe(true);
    expect(isTossScheme('supertoss-dev://main')).toBe(false);
    expect(isTossScheme(`supertoss://lab?url=${encodeURIComponent('https://toss.im')}`)).toBe(true);

    expect(isTossScheme('servicetoss://my-insurance')).toBe(true);
    expect(isTossScheme('servicetoss://insurance-partner?foo=1')).toBe(true);
    expect(isTossScheme('servicetoss-alpha://insurance-partner?foo=1')).toBe(true);
    expect(isTossScheme('servicetoss-live://insurance-partner?foo=1')).toBe(true);
    expect(isTossScheme('servicetoss-staging://insurance-partner?foo=1')).toBe(true);
    expect(isTossScheme('servicetoss-dev://insurance-partner?foo=1')).toBe(false);

    expect(isTossScheme('mytoss://naver.com')).toBe(false);
  });
});

function mockWindowLocation({ href }: { href: string }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete window.location;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.location = { href, origin: new URL(href).origin };
}
