/** @tossdocs-ignore */
import { expectType } from 'tsd';
import { useNextRouter } from '../dist';

const boolean = Math.random() > 0.5;

/* eslint-disable react-hooks/rules-of-hooks */
expectType<true>(useNextRouter({ suspense: true }).isReady);
expectType<true>(useNextRouter().isReady);
expectType<boolean>(useNextRouter({ suspense: boolean }).isReady);
expectType<boolean>(useNextRouter({ suspense: false }).isReady);
expectType<boolean>(useNextRouter({ suspense: undefined }).isReady);
expectType<boolean>(useNextRouter({}).isReady);
