# identity

Returns the given value.

```typescript
function identity<T>(value: T): T;
```

# Example

```typescript
identity(5); // 5
identity('Hello, world!'); // 'Hello, world!'
identity({ foo: 'bar' }); // { foo:'bar' }
```
