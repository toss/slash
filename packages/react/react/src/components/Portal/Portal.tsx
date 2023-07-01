import ReactDOM from 'react-dom';
import { useIsMounted } from '../../hooks/useIsMounted';

interface Props {
  children: React.ReactNode;
  id: string;
}

/** @tossdocs-ignore */
export function Portal({ id, children }: Props) {
  const isMounted = useIsMounted();

  /**
   * With this code, it is possible to solve the "window is not defined" and "Hydration Error" that can occur in SSR.
   */
  if (!isMounted) {
    return <></>;
  }

  const portalElement = document.getElementById(id);
  return portalElement ? ReactDOM.createPortal(children, portalElement) : <>{children}</>;
}
