---
title: buildContext
---

# buildContext

React Context를 정의할 때 반복되는 코드를 줄여주는 헬퍼 함수입니다.

@param contextName 기능을 드러내는 이름이면 좋습니다. context의 정체성을 담당합니다.
@param defaultContextValues 기본값을 지정할 수 있습니다.
@returns [Provider, useContext]를 반환합니다.

## Examples

```tsx
const [Provider, useContext] = buildContext<{ title: string }>('TestContext', null);

function Inner() {
  const context = useContext();

  return <h1>{context.title}</h1>;
}

function Page() {
  return (
    <Provider title="타이틀">
      <Inner />
    </Provider>
  );
}
```
