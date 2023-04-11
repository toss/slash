# Scroll Animation Package

스크롤 애니메이션을 구현하는데 도움이 되는 유틸과 미리 정의된 애니메이션을 담은 패키지입니다.

## 사용법

1. 스크롤 관련 컨텍스트 주입을 위해 스크롤 애니메이션을 사용하고자 하는 영역을 `<ScrollProgressController>`로 감싸줍니다. `App.tsx`에 두어도 되지만, 이 컴포넌트는 scroll 이벤트를 핸들링하므로 필요한 화면에서만 사용하는 것을 권장합니다.
2. `useScrollProgress()` 훅을 이용해 애니메이션을 구현할 요소를 연결하고 progress 값에 따라 애니메이션을 구현하세요.

코드 예제는 스토리북을 참고하세요.

## 설정값

### triggerHook

ref 요소가 뷰포트에 얼마나 등장했을 때 progress가 시작될지 0과 1사이의 숫자로 결정합니다.

아래와 같은 alias를 사용할 수 있습니다.

- onEnter: 화면에 등장하기 시작할 때 (triggerHook = 1)
- onCenter: 화면 중앙에 ref 요소의 상단이 등장했을 때 (triggerHook = 0.5)
- onLeave: 화면에서 벗어나기 시작할 때 (triggerHook = 0)

### duration

trigger가 시작된 후로부터 progress가 얼마동안 진행될지 결정합니다.

e.g.

- (progress = 200 혹은 200px): 200px를 스크롤 할 때까지
- (progress = 200%): ref 요소의 2배 크기 만큼 스크롤 할 때까지
- (progress = 150vh): window 높이의 1.5배만큼 스크롤 할 때까지

## 미리 정의된 애니메이션

### ScrollRevealAnimation

요소가 화면의 40%~60% 영역을 지나는 동안 아래 애니메이션을 재생합니다.

- opacity가 0에서 1로 변화
- translateY가 100에서 0으로 변화
