import { createContext, useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useIsMounted } from '../../hooks/useIsMounted';

interface PortalProps {
  children: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

const portalContext = createContext<{ parentPortal: HTMLElement | null }>({
  parentPortal: null,
});

const PORTAL_DEFAULT_CLASS = 'portal';

function RenderPortal({ children, className, containerRef }: PortalProps) {
  const { parentPortal } = useContext(portalContext);

  const getPortalNode = useCallback((mountNode: HTMLElement) => {
    const portalNode = mountNode.ownerDocument.createElement('div');
    portalNode.classList.add(className || PORTAL_DEFAULT_CLASS);

    return portalNode;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This is the mount node to render portal nodes.
   * The mountNode has the value "containerRef.current" if it has a "containerRef", or the parent portal node if it is a nested portal.
   * By default, it has "document.body".
   */
  const mountNode = useMemo(() => {
    if (parentPortal) {
      return parentPortal;
    }

    if (containerRef?.current) {
      return containerRef.current;
    }

    return document.body;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const portalNode = useMemo(() => getPortalNode(mountNode), []);

  useLayoutEffect(() => {
    mountNode.appendChild(portalNode);

    /**
     * "portalNode" is removed from "mountNode" on unmount.
     */
    return () => {
      if (mountNode.contains(portalNode)) {
        mountNode.removeChild(portalNode);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return portalNode ? (
    createPortal(
      <portalContext.Provider value={{ parentPortal: portalNode }}>{children}</portalContext.Provider>,
      portalNode
    )
  ) : (
    <></>
  );
}

/** @tossdocs-ignore */
export function Portal({ children, ...restProps }: PortalProps) {
  const isMounted = useIsMounted();

  /**
   * With this code, it is possible to solve the "window is not defined" and "Hydration Error" that can occur in SSR.
   */
  if (!isMounted) {
    return <></>;
  }

  return <RenderPortal {...restProps}>{children}</RenderPortal>;
}
