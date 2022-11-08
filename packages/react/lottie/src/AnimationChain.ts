/** @tossdocs-ignore */
import { createQueryString } from '@toss/utils';
import type lottie from 'lottie-web';
import type { AnimationEventCallback, AnimationEventName } from 'lottie-web';
import { AnimationData, SPEED_DEFAULT } from './AnimationData';
import { AnimationPlayer, LoopType } from './AnimationPlayer';
import { importLottie } from './importLottie';

interface StartOptions {
  /** @default false */
  stopPreviousPlay?: boolean;
  speed?: number;
}

export interface AnimationChain {
  setSpeed: (speed: number) => void;
  showFirstFrame: () => Promise<void>;
  start: (options?: StartOptions) => Promise<void>;
  destroy: () => void;
}

export function AnimationChain(
  animationInfos: AnimationData[],
  options: {
    container: HTMLElement;
    loop?: LoopType;
    interval?: number;
    lottie: typeof lottie;
  }
) {
  let currentPlayer: AnimationPlayer | undefined;
  let players: AnimationPlayer[] | undefined;

  return {
    setSpeed(speed: number) {
      if (currentPlayer) {
        currentPlayer.setSpeed(speed);
      }
    },

    async prepare() {
      if (players === undefined) {
        const lottiePromise = importLottie();
        const jsonsPromise = Promise.all(
          animationInfos.map(async animation => {
            if ('url' in animation) {
              const response = await fetch(
                `${animation.url}${createQueryString({
                  version: animation.version,
                })}`
              );

              return response.json();
            } else {
              return JSON.parse(animation.json);
            }
          })
        );

        const [lottie, jsons] = await Promise.all([lottiePromise, jsonsPromise]);
        const sourceUrl =
          animationInfos.length === 1 && 'url' in animationInfos[0]! ? animationInfos[0].url : undefined;

        players = jsons.map((json, index) => {
          const isLast = index === animationInfos.length - 1;

          return AnimationPlayer(json, {
            lottie,
            container: options.container,
            assets: animationInfos[0]!.assets,
            loop: isLast && options.loop,
            interval: options.interval,
            lottieUrl: sourceUrl,
          });
        });
      }

      return players;
    },
    async showFirstFrame() {
      const preparedPlayers = await this.prepare();
      const firstPlayer = preparedPlayers[0];

      if (firstPlayer) {
        firstPlayer.load();
        firstPlayer.showFirstFrame();
      }
    },
    async addEventListener<T>(eventName: AnimationEventName, callback: AnimationEventCallback<T>) {
      const preparedPlayers = await this.prepare();

      preparedPlayers.forEach(player => {
        player.addEventListener(eventName, callback);
      });
    },
    async removeEventListener<T>(eventName: AnimationEventName, callback: AnimationEventCallback<T>) {
      const preparedPlayers = await this.prepare();

      preparedPlayers.forEach(player => {
        player.removeEventListener(eventName, callback);
      });
    },
    async start({ stopPreviousPlay = false, speed = SPEED_DEFAULT }: StartOptions = {}) {
      if (currentPlayer !== undefined) {
        if (stopPreviousPlay) {
          currentPlayer.destroy();
          currentPlayer = undefined;
        } else {
          return;
        }
      }

      const preparedPlayers = await this.prepare();

      for (const player of preparedPlayers) {
        if (currentPlayer !== undefined) {
          currentPlayer.destroy();
        }

        currentPlayer = player;
        player.load();
        player.setSpeed(speed);
        await player.play();
      }

      currentPlayer = undefined;
    },
    destroy() {
      if (currentPlayer !== undefined) {
        currentPlayer.destroy();
        currentPlayer = undefined;
      }
    },
    play() {
      if (currentPlayer !== undefined) {
        currentPlayer.play();
      }
    },
    pause() {
      if (currentPlayer !== undefined) {
        currentPlayer.pause();
      }
    },
  };
}
