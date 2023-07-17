# useImageLoad

The useImageLoad hook allows you to check whether an image resource has been successfully loaded with the return value 'isLoaded' for an image tag provided with 'ref'.
You can optionally add callback functions 'onLoadStart', 'onLoadComplete' to run when the image starts loading and when it finishes.

<br />

```tsx
function useImageLoad(options?: { onLoadComplete?: () => void; onLoadStart?: () => void }): {
  readonly ref: (node: HTMLImageElement) => void;
  readonly isLoaded: boolean;
};
```

## Example

- Default

```tsx
import { useImageLoad } from '@toss/react';

const Example = () => {
  const { ref, isLoaded } = useImageLoad({
    onLoadStart: () => {
      console.log('Load Start');
    },
    onLoadComplete: () => {
      console.log('Load Complete');
    },
  });

  return (
    <img
      ref={ref}
      src={imageUrl}
      width={400}
      height={400}
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }}
    />
  );
};
```

<br />

- Lazy Load Example (with.ImpressionArea & useBooleanState)

```tsx
import { ImpressionArea } from '@toss/impression-area';
import { useBooleanState } from '@toss/react';
import { useImageLoad } from '@toss/react';

const Example = () => {
  const [inView, appear] = useBooleanState(false);
  const { ref, isLoaded } = useImageLoad({
    onLoadStart: () => {
      console.log('Load Start');
    },
    onLoadComplete: () => {
      console.log('Load Complete');
    },
  });

  return (
    <ImpressionArea onImpressionStart={appear}>
      {inView && (
        <Box>
          {!isLoaded && <Skeleton>Loading...</Skeleton>}
          <img
            ref={ref}
            width={400}
            height={400}
            src={png1}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.5s',
            }}
          />
        </Box>
      )}
    </ImpressionArea>
  );
};
```
