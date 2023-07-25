---
title: buildContext
---

# buildContext

This is a helper function that reduces repetitive code when defining React Context.

@param contextName: It's good to use a descriptive name that reflects the functionality. It represents the identity of the context.
@param defaultContextValues: You can specify default values.
@returns [Provider, useContext].

## Examples

```tsx
const [Provider, useContext] = buildContext('TestContext', null);

function Inner() {
  const context = useContext < { title: string } > 'Inner';

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
