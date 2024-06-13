# useLiveAnnouncer

스크린리더 사용자에게 메시지를 표시합니다.

```ts
function useLiveAnnouncer(
  message: string,
  politeness?: AriaLivePoliteness,
  // 몇 milliseconds 이후에 Announcer Element를 제거할지 시간을 설정합니다.
  // 단, Announcer Element가 100ms 이후에 삽입되므로, 대기시간은 100ms 이후에 적용됩니다.
  duration?: number
): {
  announce: ({ message, politeness = 'polite', duration }: AnnounceOptions) => Promise<void>;
  clear: () => void;
};
```

## Example

```ts
const { announce, clear } = useLiveAnnouncer();

announce('안녕 세상!');
clear();
```
