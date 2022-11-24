/** @tossdocs-ignore */
import { isDifferentArray } from '@toss/utils';
import {
  Component,
  ComponentProps,
  ErrorInfo,
  forwardRef,
  PropsWithChildren,
  PropsWithRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import { useResetKey } from './contexts/ResetKey';

type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: (...args: unknown[]) => void;
};

type RenderFallbackType = <ErrorType extends Error>(props: RenderFallbackProps<ErrorType>) => ReactNode;
type IgnoreErrorType = <ErrorType extends Error = Error>(error: ErrorType) => boolean;

type Props<ErrorType extends Error = Error> = {
  /*
   * @description 발생할 수 있는 error에 대한 기준값으로 이 값이 변경되면 error를 초기화합니다.
   */
  resetKeys?: unknown[];
  onReset?(): void;
  renderFallback: RenderFallbackType;
  onError?(error: ErrorType, info: ErrorInfo): void;
  /*
   * @description 이 ErrorBoundary Context에서 처리하지 않고 throw해줄 error의 조건을 명시할 callback
   */
  ignoreError?: IgnoreErrorType;
};

interface State<ErrorType extends Error = Error> {
  error: ErrorType | null;
}

const initialState: State = {
  error: null,
};
export class BaseErrorBoundary extends Component<PropsWithRef<PropsWithChildren<Props>>, State> {
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

const ResetKeyErrorBoundary = forwardRef<{ reset?(): void }, ComponentProps<typeof BaseErrorBoundary>>(
  ({ resetKeys, ...rest }, resetRef) => {
    const { resetKey } = useResetKey();

    const ref = useRef<BaseErrorBoundary | null>(null);

    useImperativeHandle(resetRef, () => ({
      reset: () => ref.current?.resetErrorBoundary(),
    }));

    return <BaseErrorBoundary {...rest} resetKeys={[resetKey, ...(resetKeys ? resetKeys : [])]} />;
  }
);

const ErrorBoundary = BaseErrorBoundary as typeof BaseErrorBoundary & {
  ResetKey: typeof ResetKeyErrorBoundary;
};
ErrorBoundary.ResetKey = ResetKeyErrorBoundary;

export default ErrorBoundary;
