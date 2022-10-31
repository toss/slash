/** @tossdocs-ignore */
import { ImpressionArea } from '@toss/impression-area';
import { useBooleanState, useCombinedRefs } from '@toss/react';
import { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AnimationChain } from './AnimationChain';
import { LoopType } from './AnimationPlayer';
import { Asset } from './Asset';
import { importLottie } from './importLottie';

interface CommonProps {
  className?: string;
  assets?: Asset[];
  loop?: LoopType;
  interval?: number;
  stopOnExit?: boolean;
  delay?: number;
  speed?: number;
  autoPlay?: boolean;
  width?: number | string;
  height?: number | string;
  onPlay?: () => void;
  onLoopComplete?: () => void;
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
    onPlay,
    onLoopComplete,
    onComplete,
  }: Props,
  lottieRef: Ref<LottieRef>
) {
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
