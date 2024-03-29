import { useContext } from 'react';
import { OverlayContext } from './OverlayProvider';

export function useOverlayContext() {
  const context = useContext(OverlayContext);

  if (context === null) {
    throw new Error('useOverlay is only available within OverlayProvider.');
  }

  return context;
}
