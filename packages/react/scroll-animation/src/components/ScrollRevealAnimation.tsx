/** @tossdocs-ignore */
import { HTMLAttributes, ReactNode } from 'react';
import { useScrollProgress } from '../hooks';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function ScrollRevealAnimation({ style, ...rest }: Props) {
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
