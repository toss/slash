import { forwardRef, Ref } from 'react';
import { suspend } from 'suspend-react';
import { BaseLottie, BaseLottieProps } from './BaseLottie';
import { LottieRef } from './LottieRef';

export const SuspendedLottie = forwardRef(function SuspenseLottie(
  props: Omit<BaseLottieProps, 'src' | 'json'> & {
    src: string;
  },
  lottieRef: Ref<LottieRef>
) {
  const { src: originalSrc, ...lottieProps } = props;
  const jsonText = suspend(async () => {
    const res = await fetch(originalSrc);
    const text = await res.text();
    return text;
  }, [originalSrc]);

  return <BaseLottie json={jsonText} {...lottieProps} ref={lottieRef} />;
});
