---
title: TypedStorage
---

# TypedStorage

`TypedStorage`는 Web Storage를 사용할 때 반복적으로 작성되는 로직들(try/catch, JSON.parse/stringify)을 추상화함으로써, WebStorage를 편리하고 타입 안전하게 사용할 수 있게 해줍니다.

## Note

`TypedStorage`는 subpath export된 module 입니다. 꼭 `@toss/storage/typed`를 사용해주세요.

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
