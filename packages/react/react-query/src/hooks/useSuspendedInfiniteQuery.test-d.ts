/** @tossdocs-ignore */
import { InfiniteData } from 'react-query';
import { expectError, expectType } from 'tsd';
import { useSuspendedInfiniteQuery } from '../../dist/hooks/useSuspendedInfiniteQuery';

const queryKey = ['key'] as const;
const queryFn = async () => 'response' as const;
const boolean = Math.random() > 0.5;

type AwaitedQueryFnReturn = InfiniteData<Awaited<ReturnType<typeof queryFn>>>;

/* eslint-disable react-hooks/rules-of-hooks */
// arg1:queryKey, arg2: queryFn, arg3: options
expectType<AwaitedQueryFnReturn>(
  useSuspendedInfiniteQuery(queryKey, queryFn, {
    enabled: true,
  }).data
);
expectType<AwaitedQueryFnReturn | undefined>(
  useSuspendedInfiniteQuery(queryKey, queryFn, {
    enabled: boolean,
  }).data
);
expectType<undefined>(
  useSuspendedInfiniteQuery(queryKey, queryFn, {
    enabled: false,
  }).data
);

// arg1:queryKey, arg2: options
expectType<AwaitedQueryFnReturn>(
  useSuspendedInfiniteQuery(queryKey, {
    queryFn,
    enabled: true,
  }).data
);
expectType<AwaitedQueryFnReturn | undefined>(
  useSuspendedInfiniteQuery(queryKey, {
    queryFn,
    enabled: boolean,
  }).data
);
expectType<undefined>(
  useSuspendedInfiniteQuery(queryKey, {
    queryFn,
    enabled: false,
  }).data
);

// arg1: options
expectType<AwaitedQueryFnReturn>(
  useSuspendedInfiniteQuery({
    queryKey,
    queryFn,
    enabled: true,
  }).data
);
expectType<AwaitedQueryFnReturn | undefined>(
  useSuspendedInfiniteQuery({
    queryKey,
    queryFn,
    enabled: boolean,
  }).data
);
expectType<undefined>(
  useSuspendedInfiniteQuery({
    queryKey,
    queryFn,
    enabled: false,
  }).data
);

// no arg
expectError(useSuspendedInfiniteQuery());
