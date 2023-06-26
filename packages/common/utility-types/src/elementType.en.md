# ElementType

Indicates the type of elements that make up the array.

## Examples

```ts
type Foo = ElementType<string[]>; // Foo is string type
type Bar = ElementType<(string | number)[]>; // Bar is string | number union type

const EXAMPLE_ARRAY = ['foo', 'bar'] as const;

type Baz = ElementType<typeof EXAMPLE_ARRAY>; // Baz is "foo" | "bar" union type
```
