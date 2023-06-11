import { renderHook } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { useCallbackOnce } from './useCallbackOnce';
import { usePreservedReference } from './usePreservedReference';

type TossObject = {
  toss: string;
};

describe('usePreservedReference', () => {
  const callbackReturnTrue = jest.fn(() => true);
  const callbackReturnFalse = jest.fn(() => false);
  const tossObject: TossObject = { toss: '토스' };

  const useTestCustomHook = (object: TossObject, areValuesEqual?: () => boolean) => {
    const [reference, setReference] = useState<TossObject>(tossObject);
    const ref = usePreservedReference<TossObject>(reference, areValuesEqual);

    const oneUseEffect = useCallbackOnce(() => {
      setReference(object);
    }, []);

    useEffect(() => {
      oneUseEffect();
    }, [oneUseEffect]);

    return ref;
  };

  describe('with Default Callback Function', () => {
    it('changed to the same value', () => {
      const { result } = renderHook(() => {
        return useTestCustomHook({ toss: '토스' });
      });

      expect(tossObject).toBe(result.current);
      expect(tossObject).toEqual(result.current);
    });
    it('changed to a different value', () => {
      const { result } = renderHook(() => {
        return useTestCustomHook({ toss: 'toss' });
      });

      expect(tossObject).not.toBe(result.current);
      expect(tossObject).not.toEqual(result.current);
    });
  });
  describe('with Custom Callback Function', () => {
    it('changed to the same value', () => {
      const { result } = renderHook(() => {
        return useTestCustomHook({ toss: '토스' }, callbackReturnTrue);
      });

      expect(tossObject).toBe(result.current);
      expect(tossObject).toEqual(result.current);
    });
    it('changed to a different value', () => {
      const { result } = renderHook(() => {
        return useTestCustomHook({ toss: 'toss' }, callbackReturnFalse);
      });

      expect(tossObject).not.toBe(result.current);
      expect(tossObject).not.toEqual(result.current);
    });
  });
});
