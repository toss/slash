---
title: 소개
hide_table_of_contents: true
---

# Slash 라이브러리

<head>
  <meta property="og:title" content="Slash 라이브러리" />
  <meta property="og:description" content="높은 퀄리티의 웹 서비스를 개발하기 위한 TypeScript/JavaScript 패키지 세트" />
  <meta property="og:url" content="https://slash.page/ko" />
  <meta property="og:image" content="https://static.toss.im/homepage-static/newtoss/newtoss-og.jpg" />
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

  <div style={{ gridArea: 'image', textAlign: 'center' }}>
  <img src="https://static.toss.im/illusts-common/img-stock-file-alpha.png" alt="" style={{ width: 200, height: 150, objectFit: 'cover' }} />
  </div>
</div>

<style
  dangerouslySetInnerHTML={{
    __html: `
.mainpage_hero {
  display: grid;
}

@media (min-width: 400px) {
  .mainpage_hero {
    grid-template-areas: "text image";
    grid-template-columns: 1fr 200px;
  }
}

@media (max-width: 400px) {
  .mainpage_hero {
    grid-template-areas: "image" "text";
    grid-template-rows: min-content min-content;
  }
}
`,
  }}
></style>

<div style={{ height: 24 }} />

## 추천 라이브러리

- [**@toss/use-overlay**](https://slash.page/ko/libraries/react/use-overlay/src/useOverlay.i18n) 는 `useOverlay` React hook을 제공하여, 오버레이를 선언적으로 관리할 수 있게 해 줘요.
- [**@toss/react**](https://slash.page/libraries/react/react/src/components/ClickArea/ClickArea.tsx.tossdocs)는 높은 퀄리티의 웹 서비스를 개발할 수 있도록 다양한 React 컴포넌트, Hooks, 유틸리티 함수를 제공해요.
- [**@toss/utils**](https://slash.page/libraries/common/utils/) 는 Node.js와 브라우저 환경에서 사용할 수 있는 간단하고 모던한 유틸리티 함수를 제공해요.
- [**@toss/hangul**](https://slash.page/libraries/common/hangul/) 는 [hangul](https://en.wikipedia.org/wiki/Hangul) 문자를 다루기 위한 유틸리티 함수를 제공해요.

<div style={{ height: 24 }} />

## 더 읽기

- [기여하기](https://github.com/toss/slash/blob/main/.github/CONTRIBUTING.md)
