/** @tossdocs-ignore */
import { Ref, useImperativeHandle, forwardRef, useEffect, useState, useCallback } from 'react';

import { CreateOverlayElement } from './types';

interface Props {
  overlayElement: CreateOverlayElement;
  onExit: () => void;
}

export interface OverlayControlRef {
  close: () => void;
}

export const OverlayController = forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit }: Props,
  ref: Ref<OverlayControlRef>
) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(
    ref,
    () => {
      return { close: handleClose };
    },
    [handleClose]
  );

  useEffect(() => {
    // NOTE: requestAnimationFrame이 없으면 가끔 Open 애니메이션이 실행되지 않는다.
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  return <OverlayElement isOpen={isOpen} close={handleClose} exit={onExit} />;
});
