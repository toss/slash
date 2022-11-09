import { expectType } from 'tsd';
import { SuspendedUseQueryResultOnIdle, SuspendedUseQueryResultOnSuccess, useSuspendedQuery } from '../dist';

const queryKey = ['example'] as const;
const queryFn = async () => 'response';

/* eslint-disable react-hooks/rules-of-hooks */
expectType<SuspendedUseQueryResultOnSuccess<'response'>>(useSuspendedQuery(queryKey, queryFn));
expectType<SuspendedUseQueryResultOnSuccess<'response'>>(useSuspendedQuery(queryKey, queryFn, { enabled: true }));
expectType<SuspendedUseQueryResultOnIdle<undefined>>(useSuspendedQuery(queryKey, queryFn, { enabled: false }));
expectType<SuspendedUseQueryResultOnSuccess<'response'> | SuspendedUseQueryResultOnIdle<undefined>>(
  useSuspendedQuery(queryKey, queryFn, { enabled: Boolean(Math.random() > 0.5) })
);
