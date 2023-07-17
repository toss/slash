# useImageLoad

useImageLoad 훅을 사용하면 'src' 속성과 함께 제공된 이미지 태그에 대해 반환값 'isLoaded'를 사용하여 이미지 리소스가 성공적으로 로드되었는지 여부를 확인할 수 있습니다.
이미지를 로드 시작 할 때, 완료될 때 실행하는 콜백 함수 'onLoadStart', 'onLoadComplete'를 옵션으로 추가할 수 있습니다.

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
      console.log('load start');
    },
    onLoadComplete: () => {
      console.log('load complete');
    },
  });

  return <img ref={ref} width={400} height={400} style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }} />;
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
      console.log('load start');
    },
    onLoadComplete: () => {
      console.log('load complete');
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
