/** @tossdocs-ignore */
import { HTMLAttributes, PropsWithChildren } from 'react';
import { useScrollProgress } from '../hooks';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function ScrollRevealAnimation({ style, ...rest }: PropsWithChildren<Props>) {
  const { ref, scrollYProgress } = useScrollProgress<HTMLDivElement>({
    triggerHook: 0.6,
    duration: '20vh',
    clip: true,
  });
  const translateY = (1 - scrollYProgress) * 100;

  return (
    <div
      ref={ref}
      style={{ transform: `translate3d(0, ${translateY}px, 0)`, opacity: scrollYProgress, ...style }}
      {...rest}
    />
  );
}
