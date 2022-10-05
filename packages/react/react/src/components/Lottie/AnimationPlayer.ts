/** @tossdocs-ignore */
import { delay } from '@tossteam/utils';
import type { AnimationEventCallback, AnimationEventName, AnimationItem } from 'lottie-web';
import { LottiePlayer } from '../../utils/importLottie';
import { SPEED_DEFAULT } from './AnimationData';
import { Asset } from './Asset';

export type AnimationPlayer = ReturnType<typeof AnimationPlayer>;

/**
 * normal, true : 0  -> 100, 0 -> 100 (frame)
 * reversed : 0 -> 100, 100 -> 0 (frame)
 * @default false
 */
export type LoopType = boolean | 'normal' | 'reversed';

type AnimationPlayerOption = {
  container: HTMLElement;
  assets?: Asset[];
  loop?: LoopType;
  interval?: number;
  lottie: LottiePlayer;
  lottieUrl?: string;
};
/**
 * @name AnimationPlayer
 * @deprecated `@tossteam/lottie`의 `AnimationPlayer`를 사용하세요
 */
export function AnimationPlayer(json: any, options: AnimationPlayerOption) {
  let lottieObject: AnimationItem | undefined;
  let _speed = SPEED_DEFAULT;
  const shouldLoop = Boolean(options.loop);
  const shouldLoopWithInterval = shouldLoop && Boolean(options.interval);
  const shouldLoopWithReverse = shouldLoop && options.loop === 'reversed';

  return {
    load() {
      if (lottieObject !== undefined) {
        return;
      }

      lottieObject = options.lottie.loadAnimation({
        container: options.container,
        animationData: replaceAssets(json, options.assets, { lottieUrl: options.lottieUrl }),
        loop: shouldLoop && !shouldLoopWithInterval && !shouldLoopWithReverse,
        renderer: 'svg',
        autoplay: true,
      });
      lottieObject.setSpeed(_speed);
    },
    showFirstFrame() {
      if (lottieObject === undefined) {
        return;
      }

      lottieObject.goToAndStop(0);
    },
    play() {
      return new Promise<void>(resolve => {
        if (lottieObject === undefined) {
          resolve();
          return;
        }

        const handleComplete = async () => {
          const isNotLoop = (shouldLoopWithInterval || shouldLoopWithReverse) === false;
          if (lottieObject == null || isNotLoop) {
            resolve();
            return;
          }

          await delay(options.interval ?? 0);

          /*
           * NOTE(@raon0211):
           * delay가 실행되는 동안 destroy() 되면 lottieObject가 undefined가 될 수 있다.
           */
          if (shouldLoopWithReverse) {
            const nextDirection = lottieObject.playDirection > 0 ? -1 : 1;
            lottieObject?.setDirection(nextDirection);
            lottieObject?.play();
          } else {
            lottieObject?.goToAndPlay(0);
          }
        };

        lottieObject.addEventListener('complete', handleComplete);
        lottieObject.addEventListener('destroy', resolve);

        lottieObject.play();
      });
    },
    setSpeed(speed: number) {
      _speed = speed;

      if (lottieObject === undefined) {
        return;
      }
      lottieObject.setSpeed(speed);
    },
    addEventListener<T>(eventName: AnimationEventName, callback: AnimationEventCallback<T>) {
      lottieObject?.addEventListener(eventName, callback);
    },
    removeEventListener<T>(eventName: AnimationEventName, callback: AnimationEventCallback<T>) {
      lottieObject?.removeEventListener(eventName, callback);
    },
    destroy() {
      if (lottieObject !== undefined) {
        lottieObject.destroy();
        lottieObject = undefined;
      }
    },
  };
}

/**
 * @description
 * 디자이너분들이 로띠를 제작할 때 Lottie json 파일과 Lottie에서 쓰이는 이미지들을 가까운 곳에 모아둡니다.
 * 그렇게 한 뒤 상대 경로를 이용해서 Lottie가 작성됩니다. 이를테면 이런 식입니다:
 * {
 *   "u": "images/",
 *   "p": "brand_list_0.jpg"
 * }
 * 하지만 프론트엔드에서는 상대 경로를 이용해서 이미지를 찾을 수 없어서, 상대 경로를 절대 경로로 바꿔줘야 합니다.
 * 절대 경로로 바꾸기 위해, LottieUrl을 이용해서 images의 basePath를 획득하는 유틸리티입니다.
 *
 * @example
 * input: https://static.toss.im/lotties/Intelligence/brand-list-light.json
 * output: https://static.toss.im/lotties/Intelligence/images/
 */
function getAbsoluteBasePathOfLottieImage(lottieUrl: string) {
  return `${lottieUrl.split('/').slice(0, -1).join('/')}/images/`;
}

function replaceAssets(originalLottieJSON: any, assets: Asset[] = [], meta: { lottieUrl?: string }) {
  return {
    ...originalLottieJSON,
    assets: (originalLottieJSON.assets ?? []).map(
      (originalAsset: { id: string; w: string; h: string; u?: string; p: string; e: string }) => {
        const replaceableAsset = assets.find(asset => asset.id === originalAsset.id);
        if (replaceableAsset != null) {
          const filePathTokens = replaceableAsset.url.split('/');
          const fileName = filePathTokens.pop();
          const filePath = `${filePathTokens.join('/')}/`;
          return {
            ...originalAsset,
            u: filePath,
            p: fileName,
          };
        }

        if (meta.lottieUrl != null && originalAsset.u != null) {
          const isAbsolutePath = originalAsset.u.startsWith('http');
          return {
            ...originalAsset,
            u: isAbsolutePath ? originalAsset.u : getAbsoluteBasePathOfLottieImage(meta.lottieUrl),
          };
        } else {
          return originalAsset;
        }
      }
    ),
  };
}
