# identity

주어진 인자를 그대로 반환합니다.

```typescript
function identity<T>(value: T): T;
```

# Example

```typescript
identity(5); // 5
identity('Hello, world!'); // 'Hello, world!'
identity({ foo: 'bar' }); // { foo:'bar' }
```
