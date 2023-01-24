/** @tossdocs-ignore */
import { useMemo, useState } from 'react';

export default function useErrorBoundary<ErrorType extends Error>() {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error != null) {
    throw error;
  }

  const errorBoundary = useMemo(() => ({ throw: setError }), [setError]);

  return errorBoundary;
}
