/** @tossdocs-ignore */
import { delay } from '@toss/utils';
import type { AnimationEventCallback, AnimationEventName, AnimationItem } from 'lottie-web';
import { SPEED_DEFAULT } from './AnimationData';
import { Asset } from './Asset';
import { LottiePlayer } from './importLottie';

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
           * delay??? ???????????? ?????? destroy() ?????? lottieObject??? undefined??? ??? ??? ??????.
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
    pause() {
      if (lottieObject !== undefined) {
        lottieObject.pause();
      }
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
 * ????????????????????? ????????? ????????? ??? Lottie json ????????? Lottie?????? ????????? ??????????????? ????????? ?????? ???????????????.
 * ????????? ??? ??? ?????? ????????? ???????????? Lottie??? ???????????????. ???????????? ?????? ????????????:
 * {
 *   "u": "images/",
 *   "p": "brand_list_0.jpg"
 * }
 * ????????? ???????????????????????? ?????? ????????? ???????????? ???????????? ?????? ??? ?????????, ?????? ????????? ?????? ????????? ???????????? ?????????.
 * ?????? ????????? ????????? ??????, LottieUrl??? ???????????? images??? basePath??? ???????????? ?????????????????????.
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
