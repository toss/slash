import { createContext, useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useIsMounted } from '../../hooks/useIsMounted';

interface PortalProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement | null>;
}

const portalContext = createContext<{ parentPortal: HTMLElement | null }>({
  parentPortal: null,
});

function RenderPortal({ containerRef, children }: PortalProps) {
  const { parentPortal } = useContext(portalContext);

  const getPortalNode = useCallback((mountNode: HTMLElement) => {
    const portalNode = mountNode.ownerDocument.createElement('div');
    portalNode.classList.add('portal');

    return portalNode;
  }, []);

  const mountNode = useMemo(() => {
    /**
     * If a nested Portal Component has a containerRef, it will still be rendered to the parent Portal Component.
     */
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
export function Portal({ containerRef, children }: PortalProps) {
  const isMounted = useIsMounted();

  /**
   * With this code, it is possible to solve the "window is not defined" and "Hydration Error" that can occur in SSR.
   */
  if (!isMounted) {
    return <></>;
  }

  return <RenderPortal containerRef={containerRef}>{children}</RenderPortal>;
}
