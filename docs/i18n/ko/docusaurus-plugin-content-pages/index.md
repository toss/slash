---
title: 소개
hide_table_of_contents: true
---

<div class="jumbotron">
  <div class="jumbotron-inner-wrapper">
    <div class="jumbotron-shadow left"></div>
    <video class="key-video" src="https://static.toss.im/assets/slash-libraries/keyvis.mp4" autoplay="true" muted="true" playsInline="true" loop="true" />
    <div class="jumbotron-shadow right"></div>
  </div>
</div>

# Slash 라이브러리

<head>
  <meta property="og:title" content="Slash 라이브러리" />
  <meta property="og:description" content="높은 퀄리티의 웹 서비스를 개발하기 위한 TypeScript/JavaScript 패키지 세트" />
  <meta property="og:url" content="https://slash.page/ko" />
  <meta property="og:image" content="https://static.toss.im/assets/slash-libraries/slash-og.png" />
</head>

<div className="mainpage_hero">
  <div style={{ gridArea: 'text' }}>
  <p>
  Slash 라이브러리는 <a href="https://toss.im">토스</a>에서 사용하는 TypeScript/JavaScript 패키지들이에요.
  </p>

  <p>
  높은 퀄리티의 웹 서비스를 만들 수 있는 기반으로 사용할 수 있도록 30개 이상의 npm 패키지를 제공하고 있어요.
  </p>

  <p><code>⌘ + K</code>를 입력해서 라이브러리 문서를 탐색해보세요.</p>

  </div>
</div>

<style
  dangerouslySetInnerHTML={{
    __html: `
.mainpage_hero {
  display: grid;
}

.jumbotron {
  width: 100%;
  height: 200px;
  border-radius: 16px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
  overflow: hidden;
}

.jumbotron-shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 25px;
}

.jumbotron-shadow.left {
  left: 0;
  background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
}

.jumbotron-shadow.right {
  right: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
}

.jumbotron-inner-wrapper {
  position: relative;
  height: 100%;
}

@media (min-width: 600px) {
  .mainpage_hero {
    grid-template-areas: "text image";
    grid-template-columns: 1fr 300px;
  }

  .key-video {
    width: auto;
    height: 100%;
  }
}

@media (max-width: 600px) {
  .mainpage_hero {
    grid-template-areas: "image" "text";
    grid-template-rows: min-content min-content;
  }

  .key-video {
    width: auto;
    height: 100%;
  }
}
`,
  }}
></style>

<div style={{ height: 24 }} />

## 추천 라이브러리

- [**@toss/use-overlay**](https://slash.page/ko/libraries/react/use-overlay/src/useOverlay.i18n) 는 `useOverlay` React hook을 제공하여, 오버레이를 선언적으로 관리할 수 있게 해 줘요.
- [**@toss/react**](https://slash.page/ko/libraries/react/react/src/components/ClickArea/ClickArea.i18n) 는 높은 퀄리티의 웹 서비스를 개발할 수 있도록 다양한 React 컴포넌트, Hooks, 유틸리티 함수를 제공해요.
- [**@toss/utils**](https://slash.page/ko/libraries/common/utils/README.i18n) 는 Node.js와 브라우저 환경에서 사용할 수 있는 간단하고 모던한 유틸리티 함수를 제공해요.
- [**@toss/hangul**](https://slash.page/ko/libraries/common/hangul/README.i18n) 는 [hangul](https://en.wikipedia.org/wiki/Hangul) 문자를 다루기 위한 유틸리티 함수를 제공해요.

## 프로젝트 상태

- Slash는 레거시 프로젝트이고, 현재 유지보수되고 있지 않습니다.
- Slash의 여러 유용한 기능들은 여러 개의 별도 패키지들로 분리될 예정이며, 현재 개발 진행 중입니다.
  - [es-hangul](https://github.com/toss/es-hangul)은 쉽게 한글을 다룰 수 있도록 돕는 JavaScript 라이브러리입니다.
  - [es-toolkit](https://github.com/toss/es-toolkit)은 높은 성능과 작은 번들 사이즈, 강력한 타입을 자랑하는 현대적인 JavaScript 유틸리티 라이브러리입니다.
  - [suspensive](https://github.com/toss/suspensive)는 React의 Suspense와 ErrorBoundary를 우아하게 다루는 JavaScript 라이브러리입니다.
  - [use-funnel](https://github.com/toss/use-funnel)은 강력하고 안전한 단계별 상태 관리 React 라이브러리입니다.
- Slash 기여를 원하시는 분들은 Slash가 아닌 위 패키지들에 기여를 부탁드립니다.

<div style={{ height: 24 }} />

## 더 읽기

- [기여하기](https://github.com/toss/slash/blob/main/.github/CONTRIBUTING.md)
