import { ImpressionArea, useBooleanState, useCombinedRefs } from './react';
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

/**
 * @name Lottie
 * @description
 * `lottie-web` 라이브러리를 이용하여 리액트 환경에서 로띠를 쉽게 사용할 수 있도록 토스팀에서 만든 라이브러리입니다.
 *
 * - [👉 사용할 수 있는 로띠 보러가기](https://www.notion.so/tossteam/265d7675209c406889b110c94b2b9252?v=cf7ca1f997c84eae99f0b4427b1c65d9)
 *
 * ```tsx
 * <Lottie
 *   // 동적으로 로띠 내의 에셋을 변경할 때 사용
 *   // `@optional `
 *   assets={[ ...assets ]}
 *
 *   // 애니메이션이 반복 재생되는지 여부
 *   // `@default false (boolean | 'normal' | 'reversed')`
 *   loop={true}
 *
 *   // 애니메이션이 반복 재생될 때 사이의 딜레이
 *   // `@default 0`
 *   interval={0}
 *
 *   // 애니메이션이 화면 바깥으로 나갔을 때 애니메이션 재생을 잠시 일시정지하는지 여부
 *   // `@default false`
 *   stopOnExit={true}
 *
 *   // 애니메이션 재생 딜레이 (ms)
 *   // `@default 0`
 *   delay={0}
 *
 *   // 애니메이션 재생 속도
 *   // `@default 1`
 *   speed={1}
 *
 *   // 자동 시작 여부
 *   // `@default true`
 *   autoPlay={false}
 *
 *   // 로띠 컴포넌트의 너비
 *   // `@optional (number | string)`
 *   width={160}
 *
 *   // 로띠 컴포넌트의 높이
 *   // `@optional (number | string)`
 *   height={160}
 *
 *   // 애니메이션이 시작되면 onPlay 핸들러를 호출합니다.
 *   // `@optional `
 *   onPlay={onPlay}
 *
 *   // 반복되는 로띠가 종료될 때 onLoopComplete 핸들러를 호출합니다.
 *   // `@optional `
 *   onLoopComplete={onLoopComplete}
 *
 *   // 로띠가 완료되었을 때 onComplete 핸들러를 호출합니다.
 *   // `@optional `
 *   onComplete={onComplete}
 *
 *   // 접근성을 위한 속성을 의미합니다.
 *   // 넘어온 alt 값은 aria-labal로 설정되고, role은 "img"가 됩니다. (없으면 aria-hidden 처리됩니다.)
 *   // `@optional `
 *   alt={""}
 * />
 * ```
 */
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
