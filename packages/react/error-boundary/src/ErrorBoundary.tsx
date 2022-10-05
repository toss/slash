import { Component, ErrorInfo, PropsWithChildren, PropsWithRef, ReactNode } from 'react';
import isDifferentArray from './isDifferentArray';

type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: (...args: unknown[]) => void;
};

type RenderFallbackType = <ErrorType extends Error>(props: RenderFallbackProps<ErrorType>) => ReactNode;
type IgnoreErrorType = <ErrorType extends Error = Error>(error: ErrorType) => boolean;

type Props<ErrorType extends Error = Error> = {
  /*
   * @description 발생할 수 있는 error에 대한 기준값으로 이 값이 변경되면 error를 초기화합니다.
   * @see https://github.com/tosspayments/frontend/pull/955#pullrequestreview-568141641
   */
  resetKeys?: unknown[];
  onReset?(): void;
  renderFallback: RenderFallbackType;
  onError?(error: ErrorType, info: ErrorInfo): void;
  /*
   * @description 이 ErrorBoundary Context에서 처리하지 않고 throw해줄 error의 조건을 명시할 callback
   * @see https://github.com/tosspayments/frontend/pull/964#pullrequestreview-568847692
   */
  ignoreError?: IgnoreErrorType;
};

interface State<ErrorType extends Error = Error> {
  error: ErrorType | null;
}

const initialState: State = {
  error: null,
};

/**
 * @name ErrorBoundary
 * @description
 * 선언적으로 에러를 관리하기 위해서 사용하는 컴포넌트입니다.
 * `ErrorBoundary` 컴포넌트는 children의 render/useEffect에서 발생한 에러를 잡아 `renderFallback`으로 주어진 컴포넌트를 렌더링합니다.
 * @example
 * <ErrorBoundary
 *   // 에러가 발생하면 그려질 컴포넌트입니다.
 *   // 첫 번째 인자는 잡힌 에러를 나타냅니다.
 *   renderFallback={error => <div>에러가 발생했어요. {error.message}</div>}
 *
 *   // 에러가 발생하면 호출되는 callback입니다.
 *   // 첫 번째 인자는 잡힌 에러, 두 번째 인자는 에러가 발생한 컴포넌트의 stack을 나타냅니다.
 *   // componentStack의 타입은 `string` 입니다.
 *   onError={(error, { componentStack }) => {
 *     alert(error.message);
 *     console.log(componentStack);
 *   }}
 *
 *   // 배열 안에 담긴 값이 바뀌면 ErrorBoundary로 잡힌 에러를 초기화합니다.
 *   // 값이 동일한지 여부는 `Object.is()` 로 검증합니다.
 *   // @default []
 *   resetKeys={['key1', 'key2']}
 *
 *   // 에러가 초기화되면 호출됩니다.
 *   // 타입은 `() => void` 입니다.
 *   onReset={() => {}}
 *
 *   // 잡힌 에러를 무시하고 다시 throw 할지 여부를 반환합니다.
 *   // true 가 반환될 경우, error를 이 ErrorBoundary에서 잡지 않고 throw 합니다.
 *   ignoreError={error => error.message.includes('어쩌구')}
 * >
 *   <에러를_발생시킬_수_있는_컴포넌트 />
 * </ErrorBoundary>
 * @see https://jbee.io/react/error-declarative-handling-1/ 선언적으로 로딩과 에러 상태 처리하기
 * @see https://toss.im/slash-21/sessions/3-1 Suspense와 에러 처리 관련된 Slash 21 발표
 */
export default class ErrorBoundary extends Component<PropsWithRef<PropsWithChildren<Props>>, State> {
  state = initialState;
  /**
   * @see https://github.com/bvaughn/react-error-boundary/blob/master/src/index.tsx#L97
   */
  updatedWithError = false;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { onError, ignoreError } = this.props;

    if (ignoreError?.(error)) {
      throw error;
    }

    onError?.(error, info);
  }

  resetState() {
    this.updatedWithError = false;
    this.setState(initialState);
  }

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.resetState();
  };

  componentDidUpdate(prevProps: Props) {
    const { error } = this.state;

    if (error == null) {
      return;
    }

    const { resetKeys } = this.props;

    if (!this.updatedWithError) {
      this.updatedWithError = true;
      return;
    }

    if (isDifferentArray(prevProps.resetKeys, resetKeys)) {
      this.resetErrorBoundary();
    }
  }

  render() {
    const { children, renderFallback } = this.props;
    const { error } = this.state;

    if (error != null) {
      return renderFallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }

    return children;
  }
}
