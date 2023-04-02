# useLiveAnnouncer

Display a message for screen reader users.

```ts
function useLiveAnnouncer(
  message: string,
  politeness?: AriaLivePoliteness,
  // Set the time to remove the Announcer Element after how many milliseconds.
  // However, since the Announcer Element is inserted after 100ms, the wait time is applied after 100ms.
  duration?: number
): {
  announce: ({ message, politeness = 'polite', duration }: AnnounceOptions) => Promise<void>;
  clear: () => void;
};
```

## Example

```ts
const { announce, clear } = useLiveAnnouncer();

announce('Hello World!');
clear();
```
