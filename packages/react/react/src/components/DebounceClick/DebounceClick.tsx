import { Children, cloneElement, ReactElement } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface Props {
  /*
   * @description 이벤트를 묶어서 한번에 보낼 시간으로 ms 단위
   * e.g.) 200ms 일 때, 200ms 안에 발생한 이벤트를 무시하고 마지막에 한번만 방출합니다.
   */
  wait: Parameters<typeof useDebounce>[1];
  children: ReactElement;
  /*
   * @default 'onClick'
   * @description 이벤트 Prop 이름으로 'onClick' 이름 외로 받을 때 사용합니다.
   * e.g. "onCTAClick", "onItemClick" ...
   */
  capture?: string;
}
/**
 * @name DebounceClick
 * @description click event에 debounce를 적용할 수 있는 유틸 컴포넌트입니다.
 * @example
 * ```tsx
 *   <DebounceClick wait={200}>
 *     <Button
 *       onClick={() => {
 *         alert('onClick 이벤트 발생');
 *       }}
 *     >
 *       클릭
 *     </Button>
 *   </DebounceClick>
 * ```
 */
export function DebounceClick({ capture = 'onClick', children, wait }: Props) {
  const child = Children.only(children);
  const debouncedCallback = useDebounce((...args: any[]) => {
    if (child.props && typeof child.props[capture] === 'function') {
      return child.props[capture](...args);
    }
  }, wait);

  return cloneElement(child, {
    [capture]: debouncedCallback,
  });
}
