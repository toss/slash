import { createContext, ReactNode, useContext } from 'react';
import { Router } from './router';
import { assert } from '@toss/assert';

const RouterContext = createContext<Router | null>(null);

type RouterProviderProps = {
  router: Router;
  children: ReactNode;
};

export const RouterProvider = ({ router, children }: RouterProviderProps) => {
  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
};

export const useRouter = () => {
  const router = useContext(RouterContext);

  assert(router, '라우터가 존재하지 않습니다. RouterProvider를 통해 주입해주세요.');

  return router;
};
