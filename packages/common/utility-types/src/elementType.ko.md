# ElementType

배열을 구성하고 있는 요소들의 타입을 나타냅니다.

## Examples

```ts
type Foo = ElementType<string[]>; // Foo is string type
type Bar = ElementType<(string | number)[]>; // Bar is string | number union type

const EXAMPLE_ARRAY = ['foo', 'bar'] as const;

type Baz = ElementType<typeof EXAMPLE_ARRAY>; // Baz is "foo" | "bar" union type
```
