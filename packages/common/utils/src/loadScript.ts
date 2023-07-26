/** @tossdocs-ignore */
import { isServer } from './device/index';

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

export { loadScript };

export default loadScript;
