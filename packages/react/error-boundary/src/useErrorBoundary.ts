/** @tossdocs-ignore */
import { useState } from 'react';

export default function useErrorBoundary<ErrorType extends Error>() {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error != null) {
    throw error;
  }

  return setError;
}
