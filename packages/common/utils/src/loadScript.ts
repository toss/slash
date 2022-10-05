import { isServer } from './device/index';

/**
 * @name loadScript
 * @description
 * `source` 로 주어진 URL의 스크립트를 동적으로 로드합니다.
 * ```typescript
 * loadScript(source: string): Promise<void>
 * ```
 * @example
 * loadScript('https://example.com/script.js')
 */
function loadScript(source: string) {
  if (isServer()) {
    return Promise.resolve();
  }

  const element = document.querySelector(`script[src="${source}"]`);

  // 이미 로드되어 있거나 로드 중
  if (element) {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = source;
    document.body.append(script);

    script.addEventListener('load', resolve);
  });
}

export default loadScript;
