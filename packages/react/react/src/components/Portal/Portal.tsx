import { createContext, useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useIsMounted } from '../../hooks/useIsMounted';

interface PortalProps {
  children: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLElement>;
}

const PortalContext = createContext<{ parentPortalElement: HTMLElement | null }>({
  parentPortalElement: null,
});

const PORTAL_DEFAULT_CLASS = 'portal';

function RenderPortal({ children, className = PORTAL_DEFAULT_CLASS, containerRef }: PortalProps) {
  const { parentPortalElement } = useContext(PortalContext);

  const createPortalElement = useCallback(
    (mountElement: HTMLElement) => {
      const portalElement = mountElement.ownerDocument.createElement('div');
      portalElement.classList.add(className);

      return portalElement;
    },
    [className]
  );

  /**
   * This is the mountElement to render portalElement.
   * The mountElement has the value "containerRef.current" if it has a "containerRef", or the parent portalElement if it is a nested portal.
   * By default, it has "document.body".
   */
  const mountElement = useMemo(() => {
    return parentPortalElement || containerRef?.current || document.body;
  }, [parentPortalElement, containerRef]);

  const portalElement = useMemo(() => {
    return createPortalElement(mountElement);
  }, [createPortalElement, mountElement]);

  useLayoutEffect(() => {
    mountElement.appendChild(portalElement);

    // "portalElement" is removed from "mountElement" on unmount.
    return () => {
      if (mountElement.contains(portalElement)) {
        mountElement.removeChild(portalElement);
      }
    };
  }, [portalElement, mountElement]);

  return createPortal(
    <PortalContext.Provider value={{ parentPortalElement: portalElement }}>{children}</PortalContext.Provider>,
    portalElement
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
