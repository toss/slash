---
title: 업그레이드 가이드
id: upgrade-guide
---

# 업그레이드 가이드

## v16

@tossteam 패키지들을 `v15`에서 `v16`으로 업데이트하기 위해서 아래 변경사항들에 신경써주세요.

### 라이브러리 버전 업데이트하기

- `@tossteam/tds-web`을 `v42` 이상으로 업데이트해주세요.
- `@tossteam/toss-app-bridge`를 `v3.43.2` 이상으로 업데이트해주세요.

### Peer Dependency 맞추기

- `@tossteam/bottom-sheet-utils`:
  - `@tossteam/use-back-event`를 함께 설치해주세요.
- `@tossteam/naver-map`:
  - `@tossteam/emotion-utils`를 함께 설치해주세요.
- `@tossteam/tosscore`:
  - `@tossteam/tuba`를 함께 설치해주세요.

### Breaking Changes

기존에 `@deprecated` 처리되었던 API들이 삭제되었습니다. 아래에서 안내하는 대체 API로 마이그레이션해주세요.

```shell
yarn dlx @tossteam/migration-v16 <my_path_to_service>
```

- **`@tossteam/a11y`**
  - `Time`: 필요하지 않아서 삭제되었습니다. 일반 텍스트로 작성해주세요.
- **`@tossteam/ca-react`**:
  - `addMessageListener`: `subscribeToMessages`를 이용해주세요.
- **`@tossteam/colors`**:
  - `tRadioCheckedFontColor`: 색상이 삭제되었습니다.
- **`@tossteam/legacy-use-async`**:
  - `react-query`로 마이그레이션해주세요.
- **`@tossteam/react`**:
  - `HiddenHeading`: `title` prop이 대신 `children`을 사용해주세요.
  - `SSRSuspense`, `withSSRSuspense`: `@tossteam/ssr-suspense`를 이용해주세요.
  - `enforcePlaying`: `removePlayButtonInIOSPowerSavingMode` 을 이용해주세요.
- **`@tossteam/style-helpers`**:
  - `touchable`: `@tossteam/emotion-utils`를 사용해주세요.
  - `visuallyHidden`: `@tossteam/emotion-utils`를 사용해주세요.
  - `buttonReset`: `@tossteam/emotion-utils`를 사용해주세요.
  - `coerceCssPixelValue`: `@tossteam/emotion-utils`를 사용해주세요.
  - `listRowBorder`: `@tossteam/tds-extension`을 사용해주세요.
  - `mediaQuery`, `mediaQueryScreenAndMaxWidth`, `mediaQueryScreenAndMinWidth`: `@tossteam/emotion-utils`를 사용해주세요.
  - `safeAreaInset`, `safeAreaInsetPaddingBottom`, `safeAreaInsetBottom`, `safeAreaInsetPaddingTop`, `safeAreaInsetTop`: `@tossteam/tds-extension` 을 사용해주세요.
- **`@tossteam/styles`**:
  - 더 이상 SASS를 사용하지 않아 삭제되었습니다.
- **`@tossteam/swr`**:
  - 더 이상 SWR을 사용하지 않아 삭제되었습니다. `react-query`와 `@tossteam/react-query`를 사용해주세요.
- **`@tossteam/tds-extension`**:
  - `RollingNumber`: `@tossteam/rolling-number`를 사용해주세요.
- **`@tossteam/tosscore`**:
  - `{get,post,put,del}.e2e()`: `.apiGateway()`를 사용해주세요.
  - `useBackEvent`: `@tossteam/use-back-event`를 사용해주세요.
  - `useTubaVariable`: `@tossteam/tuba`를 사용해주세요.
- **`@tossteam/utils`**:
  - `getLogoUrlFromBankCode`: `getBankIconName` 을 대신 사용해주세요.
- **`@tossteam/typings`**:
  - @^16부터 사용하지 않아 삭제되었습니다.

## toss-app-bridge

toss-app-bridge의 업그레이드 가이드는 아래 링크의 '업그레이드 가이드'에서 확인할 수 있어요.

- [app-bridge.dev.toss.bz](http://app-bridge.dev.toss.bz/)
