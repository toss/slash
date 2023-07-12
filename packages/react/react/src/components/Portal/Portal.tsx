import { createContext, useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useIsMounted } from '../../hooks/useIsMounted';

interface PortalProps {
  children: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLElement>;
}

const PortalContext = createContext<{ parentPortalNode: HTMLElement | null }>({
  parentPortalNode: null,
});

const PORTAL_DEFAULT_CLASS = 'portal';

function RenderPortal({ children, className = PORTAL_DEFAULT_CLASS, containerRef }: PortalProps) {
  const { parentPortalNode } = useContext(PortalContext);

  const createPortalNode = useCallback(
    (mountNode: HTMLElement) => {
      const portalNode = mountNode.ownerDocument.createElement('div');
      portalNode.classList.add(className);

      return portalNode;
    },
    [className]
  );

  /**
   * This is the mount node to render portal nodes.
   * The mountNode has the value "containerRef.current" if it has a "containerRef", or the parent portal node if it is a nested portal.
   * By default, it has "document.body".
   */
  const mountNode = useMemo(() => {
    return parentPortalNode || containerRef?.current || document.body;
  }, [parentPortalNode, containerRef]);

  const portalNode = useMemo(() => {
    return createPortalNode(mountNode);
  }, [createPortalNode, mountNode]);

  useLayoutEffect(() => {
    mountNode.appendChild(portalNode);

    // "portalNode" is removed from "mountNode" on unmount.
    return () => {
      if (mountNode.contains(portalNode)) {
        mountNode.removeChild(portalNode);
      }
    };
  }, [portalNode, mountNode]);

  return createPortal(
    <PortalContext.Provider value={{ parentPortalNode: portalNode }}>{children}</PortalContext.Provider>,
    portalNode
  );
}

/** @tossdocs-ignore */
export function Portal({ children, ...restProps }: PortalProps) {
  const isMounted = useIsMounted();

  // With this code, it is possible to solve the "window is not defined" and "Hydration Error" that can occur in SSR.
  if (!isMounted) {
    return <></>;
  }

  return <RenderPortal {...restProps}>{children}</RenderPortal>;
}
