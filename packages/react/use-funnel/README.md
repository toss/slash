# useFunnel

A funnel controller designed to manage funnel steps declaratively and explicitly, and to give you a clear view of the flow of state for your funnel.

## Table of Contents

- [Initialize](#initialize)
- [Defining Funnel Steps](#start)
- [Best Practice](#bestPractice)
- [API](#api)

---

<a name="initialize"></a>

## Initial Settings

Use useFunnel to enter a list of funnel steps to use.

```javascript
const [Funnel, setStep] = useFunnel(['step1', 'step2', 'step3'] as const)
```

> For correct type inference, be sure to use the step list as a literal object with a const assertion, like as const.

---

<a name="start"></a>

## Defining the funnel

useFunnel returns a tuple with two items typed as a list of steps passed in.

- The first item is the funnel component.
  - It is responsible for performing conditional rendering on which steps to show.
  - The component in the subproperty `Step` is the component that represents the step.
- The second item is a function that allows you to change the step.

Each defined funnel step is rendered when a query parameter named `funnel-step` matches the name of the step.

```javascript

const [Funnel, setStep] = useFunnel(['enter name', 'enter social security number', 'done'] as const)

return (
  <Funnel>
    <Funnel.Step name="enter name">
      <EnterNameStep /> // Render when ?funnel-step="enter name"
    </Funnel.Step>

    <Funnel.Step name="enter social security number">
      <EnterSocialSecurityNumberStep /> // Render when ?funnel-step="enter social security number"
    </Funnel.Step>

    <Funnel.Step name="done">
      <DoneStep /> // Render when ?funnel-step="done"
    </Funnel.Step>
  </Funnel>
)

```

---

<a name="bestPractice"></a>

## Best Practice

- Use useFunnel.withState - using useFunnel directly with useState introduces tricky state synchronization issues.
- Keep step transitions visible where you use useFunnel, and avoid logic that injects setStep as a prop into your component to switch steps imperatively.
- Keep your funnel's state management where you use useFunnel. It's easier to see the flow of state in your funnel in one place!

```javascript
const KyoboLifeFunnel = () => {
  const [Funnel, state, setState] = useFunnel(['apartment-type', 'select-region', 'done'] as const).withState<{
    propertyType?: 'villa' | 'apartment';
    address?: string;
  }>({});

  const requestForConsultation = useLoanApplicationCallback();

  return (
    <Funnel>
      <Funnel.Step name="apartment-type">
        <ApartmentTypeStep goToSelectRegion={() => setState(prev => ({...prev, step: 'select-region', isApartment: true})} />
      </Funnel.Step>
      <Funnel.Step name="select-region">
        <SelectRegionStep onSelectRegion={(regionInfo) => setState(prev => ({...prev, step: 'done', region: regionInfo})} />
      </Funnel.Step>
      <Funnel.Step name="done">
        <DoneStep request={() => requestForConsultation(state)} />
      </Funnel.Step>
    </Funnel>
  );
};
```

---

<a name="api"></a>

## API

### `useFunnel<Step[]>(steps, options)`

#### `steps`

- Type `Step[]`
- Takes in an object literal of the list of steps to use in this funnel.

#### `options`

- `stepQueryKey`
  - of type `string`
  - Optional
  - Determines how the current step should be represented in the query string.
  - The default is `funnel-step`.
- `initialStep`
  - Type `Step`
  - The step to enter by default if there is no query string corresponding to the `stepQueryKey`.
  - Optional
- `onStepChange`
  - `((step: Step) => void)` type
  - Optional
  - The passed callback will be called whenever the step changes.
