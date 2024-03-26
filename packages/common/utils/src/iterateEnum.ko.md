# iterateEnum

enum 타입을 순회할 때 정확한 타입 추론이 되도록 합니다.

## Example

```typescript
enum Language {
  KOR = 'KOR',
  ENG = 'ENG',
  JPN = 'JPN',
}

// Object.keys 메서드를 사용해서 이넘을 순회하는 경우 string으로 타입 추론합니다.
const arr1 = Object.keys(Language); // string[]

// iterateEnum을 사용하면 type assertion 없이 해당 enum 타입으로 정확한 타입 추론이 가능합니다.
iterateEnum(Language); // Language[]
```
