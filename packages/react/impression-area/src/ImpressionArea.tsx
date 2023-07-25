/** @tossdocs-ignore */
import { useCombinedRefs } from '@toss/react';
import { forwardRef, Ref } from 'react';
import { useImpressionRef } from './useImpressionRef';

export interface ImpressionAreaProps {
  onImpressionStart?: () => void;
  onImpressionEnd?: () => void;
  rootMargin?: string;
  /**
   * 몇 퍼센트 이상 화면에 표시되면 "보인다"고 생각할지 결정합니다.
   * 예를 들어, 0.5가 주어지면 0.5 이상이 보여졌을 때 `onImpressionStart`, 이하가 보여졌을 때 `onImpressionEnd`가 호출됩니다.
   * @default 0
   */
  areaThreshold?: number;
  /**
   * 몇 밀리세컨드 이상 화면에 표시되거나 사라져야 실제로 값을 업데이트할지 결정합니다.
   * 예를 들어, 값이 2000이면 2초 사이에 요소의 표시 상태가 바뀌어도 첫 상태와 끝 상태가 같다면 이벤트가 호출되지 않습니다.
   * @default 0
   */
  timeThreshold?: number;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  role?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'false' | 'true';
}

export const ImpressionArea = forwardRef(
  (
    {
      rootMargin,
      areaThreshold,
      timeThreshold,
      className,
      children,
      onImpressionStart,
      onImpressionEnd,
      style,
      ...otherProps
    }: ImpressionAreaProps,
    forwardedRef: Ref<HTMLDivElement>
  ) => {
    const impressionRef = useImpressionRef<HTMLDivElement>({
      onImpressionStart,
      onImpressionEnd,
      areaThreshold,
      timeThreshold,
      rootMargin,
    });

    const ref = useCombinedRefs(forwardedRef, impressionRef);

    return (
      <div className={className} ref={ref} style={style} {...otherProps}>
        {children}
      </div>
    );
  }
);
