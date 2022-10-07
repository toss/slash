# useFunnel

선언적이고 명시적으로 퍼널 스텝을 관리하고, 퍼널에 대한 상태의 흐름을 명확하게 파악할 수 있도록 만든 퍼널 컨트롤러입니다.

## 목차

- [초기 설정](#initialize)
- [퍼널 스텝 정의하기](#start)
- [Best Practice](#bestPractice)
- [API](#api)

---

<a name="initialize"></a>

## 초기 설정

useFunnel을 사용하여 사용할 퍼널 스텝 리스트를 입력해주세요.

```javascript
const [퍼널, setStep] = useFunnel(['스텝1', '스텝2', '스텝3'] as const)
```

> 정확한 타입 추론을 위해 반드시 스텝 리스트는 as const와 같이 const assertion을 통해 객체를 리터럴로 사용해주세요.

---

<a name="start"></a>

## 퍼널 정의하기

useFunnel은 전달받은 스텝 리스트로 타이핑된 2개의 아이템이 튜플로 리턴됩니다.

- 첫 번째 아이템은 퍼널 컴포넌트입니다.
  - 어떤 스텝을 보여줄지 Conditional Rendering을 수행하는 역할을 합니다.
  - 하위 프로퍼티인 `Step`에 있는 컴포넌트는 스텝을 나타내는 컴포넌트입니다.
- 두 번째 아이템은 스텝을 변경할 수 있는 함수입니다.

정의된 각 퍼널 스텝은 `funnel-step`이라는 이름의 쿼리 파라미터와 스텝의 이름이 매칭될 경우 렌더링됩니다.

```javascript

const [퍼널, setStep] = useFunnel(['이름입력', '주민번호입력', '완료'] as const)

return (
  <퍼널>
    <퍼널.Step name="이름입력">
      <이름입력스텝 /> // ?funnel-step=이름입력스텝 일 때 렌더
    </퍼널.Step>

    <퍼널.Step name="주민번호입력">
      <주민번호입력스텝 /> // ?funnel-step=주민번호입력스텝 일 때 렌더
    </퍼널.Step>

    <퍼널.Step name="완료">
      <퍼널완료스텝 /> // ?funnel-step=퍼널완료스텝 일 때 렌더
    </퍼널.Step>
  </퍼널>
)

```

---

<a name="bestPractice"></a>

## Best Practice

- useFunnel.withState을 사용해주세요. useFunnel를 useState과 함께 직접 사용하면 까다로운 상태 동기화 이슈를 만나게 돼요.
- 스텝의 전환을 useFunnel을 사용하는 곳에 보이도록 해주세요. setStep을 prop으로 컴포넌트 안으로 주입하여 Imperative하게 스텝을 전환하는 로직은 지양하는게 좋습니다.
- 퍼널의 상태 관리를 useFunnel을 사용하는 곳에서 해주세요. 퍼널에서 사용하는 상태의 흐름을 한 곳에서 명확하게 파악하기 쉬울거에요!

```javascript
const KyoboLifeFunnel = () => {
  const [Funnel, state, setState] = useFunnel(['아파트여부', '지역선택', '완료'] as const).withState<{
    propertyType?: '빌라' | '아파트';
    address?: string;
  }>({});

  const 상담신청 = useLoanApplicationCallback();

  return (
    <Funnel>
      <Funnel.Step name="아파트여부">
        <아파트여부스텝 지역선택으로가기={() => setState(prev => ({...prev, step: '지역선택', isApartment: true})} />
      </Funnel.Step>
      <Funnel.Step name="지역선택">
        <지역선택스텝 지역선택완료={(지역정보) => setState(prev => ({...prev, step: '완료', region: 지역정보})} />
      </Funnel.Step>
      <Funnel.Step name="완료">
        <완료스텝 신청={() => 상담신청(state)} />
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

- `Step[]` 타입
- 해당 퍼널에서 사용할 스텝 리스트의 객체 리터럴을 받습니다.

#### `options`

- `stepQueryKey`
  - `string` 타입
  - Optional
  - 현재 스텝을 query string에 어떻게 나타낼지 정합니다.
  - 기본값은 `funnel-step`입니다.
- `initialStep`
  - `Step` 타입
  - `stepQueryKey`에 해당하는 query string이 없을 경우, 기본적으로 진입하게 되는 스텝입니다.
  - Optional
- `onStepChange`
  - `((step: Step) => void)` 타입
  - Optional
  - 스텝이 변경될 때마다 전달된 콜백이 호출됩니다.
