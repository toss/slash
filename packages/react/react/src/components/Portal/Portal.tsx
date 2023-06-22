import ReactDOM from 'react-dom';
import { useIsMounted } from '../../hooks/useIsMounted';

interface Props {
  children: React.ReactNode;
  id: string;
}

/** @tossdocs-ignore */
export function Portal({ id, children }: Props): JSX.Element {
  const isMount = useIsMounted();

  /**
   * @description Code to resolve the "window is not defined" in Next.js
   */
  if (typeof window === 'undefined') {
    return <></>;
  }

  /**
   * @description Code to resolve "Hydration Error" in Next.js
   */
  if (!isMount) {
    return <></>;
  }

  const portalElement = document.getElementById(`${id}`);
  return portalElement ? ReactDOM.createPortal(children, portalElement) : <>{children}</>;
}
