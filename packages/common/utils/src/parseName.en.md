# parseName

A parser to separate Korean name into `[last name, first name]`.

- It's based on the rules below:
  - A two-letter name: `[last name, first name]`
  - A three-letter name:
    - A two-letter last name: `['', full name]`
    - A one-letter last name: `[last name, first name]`
  - any others: `['', full name]`

## Example

```typescript
parseName('김토스'); // => ['김', '토스']
parseName('이도'); // => ['이', '도']
parseName('김나박이'); // => ['', '김나박이']
parseName('John Doe'); // => ['', 'John Doe']
```
