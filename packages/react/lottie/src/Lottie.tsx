/** @tossdocs-ignore */
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

export const Lottie = forwardRef(function Lottie(props: LottieProps, lottieRef: Ref<LottieRef>) {
  if (props.suspense) {
    return <SuspendedLottie {...props} ref={lottieRef} />;
  }
  return <BaseLottie {...props} ref={lottieRef} />;
});
