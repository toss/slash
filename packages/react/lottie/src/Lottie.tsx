/** @tossdocs-ignore */
import { ImpressionArea } from '@toss/impression-area';
import { useBooleanState, useCombinedRefs, usePreservedCallback } from '@toss/react';
import { noop } from '@toss/utils';
import { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AnimationChain } from './AnimationChain';
import { LoopType } from './AnimationPlayer';
import { Asset } from './Asset';
import { importLottie } from './importLottie';

interface CommonProps {
  className?: string;
  /**
   * @description To change assets dynamically within the lottie
   */
  assets?: Asset[];
  /**
   * @description Whether the animation is played repeatedly
   * @default false
   */
  loop?: LoopType;
  /**
   * @description The delay between the repetition of the animation
   * @default 0
   */
  interval?: number;
  /**
   * @description Animation playback delay (ms)
   * @default 0
   */
  delay?: number;
  /**
   * @description Animation playback speed
   * @default 1
   */
  speed?: number;
  /**
   * @description To use autoPlay
   * @default true
   */
  autoPlay?: boolean;
  /**
   * @description width of lottie component
   */
  width?: number | string;
  /**
   * @description height of lottie component
   */
  height?: number | string;
  /**
   * @description Invoke the `onPlay` function when animation starts.
   */
  onPlay?: () => void;
  /**
   * @description Invoke the `onLoopComplete` function when the repeated lottie ends.
   */
  onLoopComplete?: () => void;
  /**
   * @description Invoke the `onComplete` function when the lottie is complete.
   */
  onComplete?: () => void;
  alt?: string;
}

interface JSONProps extends CommonProps {
  json: string;
  src?: undefined;
}

interface SRCProps extends CommonProps {
  src: string | string[];
  json?: undefined;
}

type Props = JSONProps | SRCProps;

interface LottieRef {
  start: () => void;
  stop: () => void;
  play: () => void;
  pause: () => void;
}

export const Lottie = forwardRef(function Lottie(
  {
    className,
    src,
    json,
    assets,
    delay: delayMs = 0,
    speed = 1,
    loop = false,
    interval = 0,
    autoPlay = true,
    width,
    height,
    alt,
    onPlay: _onPlay,
    onLoopComplete: _onLoopComplete,
    onComplete: _onComplete,
  }: Props,
  lottieRef: Ref<LottieRef>
) {
  const onPlay = usePreservedCallback(_onPlay ?? noop);
  const onLoopComplete = usePreservedCallback(_onLoopComplete ?? noop);
  const onComplete = usePreservedCallback(_onComplete ?? noop);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationChainRef = useRef<AnimationChain | null>(null);

  const [isVisible, handleImpressionStart] = useBooleanState(false);

  const isFirstPlayRef = useRef<boolean>(true);

  const fetchAnimationChain = useCallback(async () => {
    if (containerRef.current == null) {
      return null;
    }

    const lottie = await importLottie();

    const animationData =
      typeof json === 'string'
        ? [{ json, assets }]
        : typeof src === 'string'
        ? [{ url: src, assets }]
        : src!.map(url => ({ url, assets }));

    const chain = AnimationChain(animationData, {
      loop,
      interval,
      container: containerRef.current,
      lottie,
    });

    await chain.prepare();

    return chain;
  }, [json, assets, src, loop, interval]);

  const [animationChain, setAnimationChain] = useState<ReturnType<typeof AnimationChain> | null>(null);

  useEffect(() => {
    let isRunning = true;

    fetchAnimationChain().then(chain => {
      if (isRunning) {
        setAnimationChain(chain);
      }
    });

    return () => {
      isRunning = false;
    };
  }, [fetchAnimationChain]);

  const handleContainerChange = useCallback(
    (element: HTMLDivElement) => {
      if (isInViewport(element)) {
        handleImpressionStart();
      }
    },
    [handleImpressionStart]
  );

  const startAnimation = useCallback(async () => {
    if (animationChain == null) {
      return;
    }

    if (isFirstPlayRef.current && delayMs > 0) {
      await delay(delayMs);
      isFirstPlayRef.current = false;
    }

    animationChain.start({ speed });
    onPlay?.();
  }, [animationChain, delayMs, speed, onPlay]);

  const stopAnimation = useCallback(() => {
    animationChain?.destroy();
  }, [animationChain]);

  const playAnimation = useCallback(() => {
    animationChain?.play();
  }, [animationChain]);

  const pauseAnimation = useCallback(() => {
    animationChain?.pause();
  }, [animationChain]);

  useImperativeHandle(
    lottieRef,
    () => {
      return {
        start: startAnimation,
        stop: stopAnimation,
        play: playAnimation,
        pause: pauseAnimation,
      };
    },
    [startAnimation, stopAnimation, playAnimation, pauseAnimation]
  );

  useEffect(() => {
    animationChain?.showFirstFrame();
  }, [animationChain]);

  useEffect(() => {
    onComplete && animationChain?.addEventListener('complete', onComplete);
    onLoopComplete && animationChain?.addEventListener('loopComplete', onLoopComplete);

    return () => {
      onComplete && animationChain?.removeEventListener('complete', onComplete);
      onLoopComplete && animationChain?.removeEventListener('loopComplete', onLoopComplete);
    };
  }, [animationChain, onLoopComplete, onComplete]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    if (!autoPlay) {
      return;
    }

    startAnimation();

    return () => {
      animationChain?.destroy();
    };
  }, [animationChain, autoPlay, isVisible, startAnimation]);

  useEffect(() => {
    animationChainRef.current?.setSpeed(speed);
  }, [speed]);

  const ref = useCombinedRefs(containerRef, handleContainerChange);

  return (
    <ImpressionArea
      key={`${loop}-${interval}-${src}-${json}`}
      style={{ width, height }}
      className={className}
      ref={ref}
      onImpressionStart={handleImpressionStart}
      role={alt != null ? 'img' : undefined}
      aria-label={alt}
      aria-hidden={alt == null}
    />
  );
});

function delay(ms: number) {
  return new Promise(resolve => {
    window.setTimeout(resolve, ms);
  });
}

function isInViewport(element: HTMLElement | null) {
  if (element == null) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const windowWidth = window.innerWidth ?? document.documentElement.clientWidth;
  const windowHeight = window.innerHeight ?? document.documentElement.clientHeight;
  return rect.top <= windowHeight && rect.bottom >= 0 && rect.left <= windowWidth && rect.right >= 0;
}
