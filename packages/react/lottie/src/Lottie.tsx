import { forwardRef, Ref } from 'react';
import { BaseLottie, BaseLottieProps } from './BaseLottie';
import { LottieRef } from './LottieRef';
import { SuspendedLottie } from './SuspendedLottie';

type LottieProps =
  | (BaseLottieProps & {
      suspense?: false;
    })
  | (BaseLottieProps & {
      src: string;
      suspense: true;
    });

/**
 * @name Lottie
 * @description
 * `lottie-web` 라이브러리를 이용하여 리액트 환경에서 로띠를 쉽게 사용할 수 있도록 토스팀에서 만든 라이브러리입니다.
 *
 * - [👉 사용할 수 있는 로띠 보러가기](https://www.notion.so/tossteam/265d7675209c406889b110c94b2b9252?v=cf7ca1f997c84eae99f0b4427b1c65d9)
 *
 * ```tsx
 * <Lottie
 *   // Suspense를 사용할지 여부
 *   // `@default false`
 *   suspense={false}
 *
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
export const Lottie = forwardRef(function Lottie(props: LottieProps, lottieRef: Ref<LottieRef>) {
  if (props.suspense) {
    return <SuspendedLottie {...props} ref={lottieRef} />;
  }
  return <BaseLottie {...props} ref={lottieRef} />;
});
