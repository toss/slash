# iterateEnum

Ensures accurate type inference when iterating over enum types.

## Example

```typescript
enum Language {
  KOR = 'KOR',
  ENG = 'ENG',
  JPN = 'JPN',
}

// When using Object.keys method to iterate over the enum, the type inference is string.
const arr1 = Object.keys(Language); // string[]

// With iterateEnum, accurate type inference to the enum type is possible without type assertion.
iterateEnum(Language); // Language[]
```
