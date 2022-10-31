# delay

Returns a Promise which is resolved after given milliseconds.

```typescript
function delay(milliseconds: number): Promise<void>;
```

## Example

```typescript
await delay(3000);
// 3초 후
doSomething();
```
