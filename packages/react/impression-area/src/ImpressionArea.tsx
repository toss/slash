import { useCombinedRefs } from '@toss/react';
import { forwardRef, Ref } from 'react';
import { useImpressionRef } from './useImpressionRef';

export interface ImpressionAreaProps {
  onImpressionStart?: () => void;
  onImpressionEnd?: () => void;
  rootMargin?: string;
  /*
   * 몇 퍼센트 이상 화면에 표시되면 "보인다"고 생각할지 결정합니다.
   * 예를 들어, 0.5가 주어지면 0.5 이상이 보여졌을 때 `onImpressionStart`, 이하가 보여졌을 때 `onImpressionEnd`가 호출됩니다.
   * @default 0
   */
  areaThreshold?: number;
  /*
   * 몇 밀리세컨드 이상 화면에 표시되거나 사라져야 실제로 값을 업데이트할지 결정합니다.
   * 예를 들어, 값이 2000이면 2초 사이에 요소의 표시 상태가 바뀌어도 첫 상태와 끝 상태가 같다면 이벤트가 호출되지 않습니다.
   * @default 0ㅡ
   */
  timeThreshold?: number;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  role?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'false' | 'true';
}

/**
 * @name ImpressionArea
 * @description
 * 브라우저 뷰포트에 보여지거나 사라지는 시점에 이벤트를 발생시키는 컴포넌트입니다.
 * [IntersectionObserver](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) API를 사용하여 효율적으로 동작합니다.
 *
 * ImpressionArea는 추가적인 div를 render합니다. (div가 없어야 하는 경우 `useImpressionRef` Hook을 사용하세요.)
 *
 * ```tsx
 * <ImpressionArea
 *   // 요소가 브라우저 뷰포트 진입시 호출되는 callback
 *   onImpressionStart={() => {}}
 *
 *   // 요소가 브라우저 뷰포트에서 나왔을 때 호출되는 callback
 *   onImpressionEnd={() => {}}
 *
 *   // 실제 요소가 차지하는 것 대비 얼마나 margin을 줄 것인지 지정 (`string`)
 *   // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) 을 참고하세요.
 *   rootMargin={rootMargin}
 *
 *   // 몇 퍼센트 이상 보여졌을 때 진입한 것인지 지정, 0~1까지의 숫자. (`number`)
 *   // @default 0
 *   areaThreshold={areaThreshold}
 *
 *   // 몇 밀리세컨드 이상 화면에 진입해 있을 때 impression 이벤트를 호출할지 지정, ms 단위. (`number`)
 *   // @default 0
 *   timeThreshold={timeThreshold}
 * >
 *  내가 보여지면 onImpressionStart를 호출해줘
 * </ImpressionArea>
 * ```
 */
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
