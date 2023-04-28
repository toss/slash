/** @tossdocs-ignore */
import { expectError, expectType } from 'tsd';
import { useSuspendedQuery } from '../../dist/hooks/useSuspendedQuery';

const queryKey = ['key'] as const;
const queryFn = async () => 'response' as const;

type AwaitedQueryFnReturn = Awaited<ReturnType<typeof queryFn>>;

/* eslint-disable react-hooks/rules-of-hooks */
// arg1:queryKey, arg2: queryFn, arg3: options
expectType<AwaitedQueryFnReturn>(
  useSuspendedQuery(queryKey, queryFn, {
    enabled: true,
  }).data
);
expectType<AwaitedQueryFnReturn | undefined>(
  useSuspendedQuery(queryKey, queryFn, {
    enabled: Math.random() > 0.5,
  }).data
);
expectType<undefined>(
  useSuspendedQuery(queryKey, queryFn, {
    enabled: false,
  }).data
);

// arg1:queryKey, arg2: options
expectType<AwaitedQueryFnReturn>(
  useSuspendedQuery(queryKey, {
    queryFn,
    enabled: true,
  }).data
);
expectType<AwaitedQueryFnReturn | undefined>(
  useSuspendedQuery(queryKey, {
    queryFn,
    enabled: Math.random() > 0.5,
  }).data
);
expectType<undefined>(
  useSuspendedQuery(queryKey, {
    queryFn,
    enabled: false,
  }).data
);

// arg1: options
expectType<AwaitedQueryFnReturn>(
  useSuspendedQuery({
    queryKey,
    queryFn,
    enabled: true,
  }).data
);
expectType<AwaitedQueryFnReturn | undefined>(
  useSuspendedQuery({
    queryKey,
    queryFn,
    enabled: Math.random() > 0.5,
  }).data
);
expectType<undefined>(
  useSuspendedQuery({
    queryKey,
    queryFn,
    enabled: false,
  }).data
);

// no arg
expectError(useSuspendedQuery());
