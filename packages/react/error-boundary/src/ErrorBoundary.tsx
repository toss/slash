/** @tossdocs-ignore */
import { isDifferentArray } from '@toss/utils';
import {
  Component,
  ComponentPropsWithoutRef,
  ComponentType,
  ErrorInfo,
  forwardRef,
  PropsWithChildren,
  PropsWithRef,
  ReactNode,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ErrorBoundaryGroupContext } from './ErrorBoundaryGroup';
import { ComponentPropsWithoutChildren } from './types';

type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: () => void;
};

type RenderFallbackType = <ErrorType extends Error>(props: RenderFallbackProps<ErrorType>) => ReactNode;
type IgnoreErrorType = <ErrorType extends Error = Error>(error: ErrorType) => boolean;

type ErrorBoundaryProps<ErrorType extends Error = Error> = PropsWithRef<
  PropsWithChildren<{
    /**
     * @description 발생할 수 있는 error에 대한 기준값으로 이 값이 변경되면 error를 초기화합니다.
     */
    resetKeys?: unknown[];
    onReset?(): void;
    renderFallback: RenderFallbackType;
    onError?(error: ErrorType, info: ErrorInfo): void;
    /**
     * @description 이 ErrorBoundary Context에서 처리하지 않고 throw해줄 error의 조건을 명시할 callback
     */
    ignoreError?: IgnoreErrorType;
  }>
>;

interface ErrorBoundaryState<ErrorType extends Error = Error> {
  error: ErrorType | null;
}

const initialState: ErrorBoundaryState = {
  error: null,
};

class BaseErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = initialState;
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

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
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

export const ErrorBoundary = forwardRef<{ reset(): void }, ComponentPropsWithoutRef<typeof BaseErrorBoundary>>(
  (props, resetRef) => {
    const group = useContext(ErrorBoundaryGroupContext);
    const resetKeys = group.resetKey ? [group.resetKey, ...(props.resetKeys || [])] : props.resetKeys;

    const ref = useRef<BaseErrorBoundary>(null);
    useImperativeHandle(resetRef, () => ({
      reset: () => ref.current?.resetErrorBoundary(),
    }));

    return <BaseErrorBoundary {...props} resetKeys={resetKeys} ref={ref} />;
  }
);

export const useErrorBoundary = <ErrorType extends Error>() => {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error != null) {
    throw error;
  }

  return setError;
};

export const withErrorBoundary = <Props extends Record<string, unknown> = Record<string, never>>(
  Component: ComponentType<Props>,
  errorBoundaryProps: ComponentPropsWithoutChildren<typeof ErrorBoundary>
) => {
  const Wrapped = (props: Props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  if (process.env.NODE_ENV !== 'production') {
    const name = Component.displayName || Component.name || 'Component';
    Wrapped.displayName = `withErrorBoundary(${name})`;
  }

  return Wrapped;
};
