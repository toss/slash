---
title: TypedStorage
---

# TypedStorage

There are some repetitive logics for WebStorage:

- JSON.parse and JSON.stringify
- try/catch
- ...

`TypedStorage` makes WebStorage easy-to-use and type-safe by abstracting those repetitive logics.

## Note

`TypedStorage` is subpath exported module. You should use `@toss/storage/typed` to use it.

## Example

```typescript
import { TypedStorage } from '@toss/storage/typed';

type Gender = 'men' | 'women';
const count = new TypedStorage<Gender>('gender', { initialValue: 'men' });
count.get(); // 'men'
count.set('women'); // 'women'
count.set('not-gender-string'); // Type Error
```

```typescript
import { TypedStorage } from '@toss/storage/typed';

const count = new TypedStorage('count', { initialValue: 0 });
count.get(); // 0
count.set(1); // 1
count.set('not a number'); // Type Error
```
