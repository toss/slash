/** @tossdocs-ignore */
import { expectType } from 'tsd';
import { SuspendedUseQueryResultOnIdle, SuspendedUseQueryResultOnSuccess, useSuspendedQuery } from '../dist';

const queryKey = ['example'] as const;
const queryFn = async () => 'response' as const;

/* eslint-disable react-hooks/rules-of-hooks */
expectType<SuspendedUseQueryResultOnSuccess<'response'>>(useSuspendedQuery(queryKey, queryFn));
expectType<'response'>(useSuspendedQuery(queryKey, queryFn).data);
expectType<'response' | undefined>(useSuspendedQuery(queryKey, queryFn, { enabled: Math.random() > 0.5 }).data);
expectType<undefined>(useSuspendedQuery(queryKey, queryFn, { enabled: false }).data);
expectType<SuspendedUseQueryResultOnSuccess<'response'>>(useSuspendedQuery(queryKey, queryFn, { enabled: true }));
expectType<SuspendedUseQueryResultOnIdle>(useSuspendedQuery(queryKey, queryFn, { enabled: false }));
expectType<SuspendedUseQueryResultOnSuccess<'response'> | SuspendedUseQueryResultOnIdle>(
  useSuspendedQuery(queryKey, queryFn, { enabled: Boolean(Math.random() > 0.5) })
);
