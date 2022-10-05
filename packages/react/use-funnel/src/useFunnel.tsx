/** @tossdocs-ignore */
import deepEqual from 'fast-deep-equal';
import { NonEmptyArray } from './models';
import { useFunnelState } from './useFunnelState';
import { useCallback, useRef, useEffect, useMemo } from 'react';
import { assert } from '@tossteam/assert';
import { useQueryParam } from '@tossteam/use-query-param';
import { QS } from '@tossteam/utils';
import { useRouter } from 'next/router';
import { Funnel, FunnelProps, Step, StepProps } from './Funnel';

interface SetStepOptions {
  stepChangeType?: 'push' | 'replace';
  preserveQuery?: boolean;
}

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<FunnelProps<Steps>, 'steps' | 'step'>;

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((props: RouteFunnelProps<Steps>) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element;
};

const DEFAULT_STEP_QUERY_KEY = 'funnel-step';

export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    /**
     * 이 query key는 현재 스텝을 query string에 저장하기 위해 사용됩니다.
     * @default 'funnel-step'
     */
    stepQueryKey?: string;
    initialStep?: Steps[number];
    onStepChange?: (name: Steps[number]) => void;
  }
): readonly [FunnelComponent<Steps>, (step: Steps[number], options?: SetStepOptions) => void] & {
  withState: <StateExcludeStep extends Record<string, unknown> & { step?: never }>(
    initialState: StateExcludeStep
  ) => [
    FunnelComponent<Steps>,
    StateExcludeStep,
    (
      next:
        | Partial<StateExcludeStep & { step: Steps[number] }>
        | ((next: Partial<StateExcludeStep & { step: Steps[number] }>) => StateExcludeStep & { step: Steps[number] })
    ) => void
  ];
} => {
  const router = useRouter();
  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;

  assert(steps.length > 0, 'steps가 비어있습니다.');

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const step = useQueryParam<Steps[number]>(stepQueryKey) ?? options?.initialStep;

          assert(
            step != null,
            `표시할 스텝을 ${stepQueryKey} 쿼리 파라미터에 지정해주세요. 쿼리 파라미터가 없을 때 초기 스텝을 렌더하려면 useFunnel의 두 번째 파라미터 options에 initialStep을 지정해주세요.`
          );

          return <Funnel<Steps> steps={steps} step={step} {...props} />;
        },
        {
          Step,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const setStep = useCallback(
    (step: Steps[number], setStepOptions?: SetStepOptions) => {
      const { preserveQuery = true } = setStepOptions ?? {};

      const url = `${QS.create({
        ...(preserveQuery ? router.query : undefined),
        [stepQueryKey]: step,
      })}`;

      options?.onStepChange?.(step);

      switch (setStepOptions?.stepChangeType) {
        case 'replace':
          router.replace(url, undefined, {
            shallow: true,
          });
          return;
        case 'push':
        default:
          router.push(url, undefined, {
            shallow: true,
          });
          return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, router]
  );

  /**
   * 아래부터 withState() 구현입니다.
   * 외부 함수로 분리하기 어려워 당장은 inline 해둡니다.
   * FIXME: @junyong-lee withState() 구현을 외부 함수로 분리하기
   */

  type S = Record<string, unknown>;
  const [state, _setState] = useFunnelState<S>({});
  type Step = Steps[number];
  type NextState = S & { step?: Step };

  const nextPendingStepRef = useRef<Step | null>(null);
  const nextStateRef = useRef<Partial<S> | null>(null);
  const setState = useCallback(
    (next: Partial<NextState> | ((next: Partial<NextState>) => NextState)) => {
      let nextStepValue: Partial<NextState>;
      if (typeof next === 'function') {
        nextStepValue = next(state);
      } else {
        nextStepValue = next;
      }

      if (nextStepValue.step != null) {
        nextPendingStepRef.current = nextStepValue.step;
      }
      nextStateRef.current = nextStepValue;

      _setState(next);
    },
    [_setState, state]
  );

  useEffect(() => {
    if (nextPendingStepRef.current == null) {
      return;
    }
    if (deepEqual(nextStateRef.current, state)) {
      setStep(nextPendingStepRef.current);
      nextPendingStepRef.current = null;
    }
  }, [setStep, state]);

  const initializedRef = useRef(false);
  function withState<State extends Record<string, unknown>>(initialState: State) {
    if (!initializedRef.current) {
      setState(initialState);
      initializedRef.current = true;
    }
    return [FunnelComponent, state, setState] as const;
  }

  return Object.assign([FunnelComponent, setStep] as const, { withState }) as readonly [
    FunnelComponent<Steps>,
    (step: Steps[number], options?: SetStepOptions) => void
  ] & {
    withState: <StateExcludeStep extends Record<string, unknown> & { step?: never }>(
      initialState: StateExcludeStep
    ) => [
      FunnelComponent<Steps>,
      StateExcludeStep,
      (
        next:
          | Partial<StateExcludeStep & { step: Steps[number] }>
          | ((next: Partial<StateExcludeStep & { step: Steps[number] }>) => StateExcludeStep & { step: Steps[number] })
      ) => void
    ];
  };
};
