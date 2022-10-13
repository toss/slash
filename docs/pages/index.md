---
title: Introduction
hide_table_of_contents: true
---

# Slash libraries

<head>
  <meta property="og:title" content="Slash libraries" />
  <meta
    property="og:description"
    content="A collection of TypeScript/JavaScript packages to build high-quality web services."
  />
  <meta property="og:url" content="https://slash.page" />
  <meta property="og:image" content="https://static.toss.im/homepage-static/newtoss/newtoss-og.jpg" />
</head>

<div className="mainpage_hero">
  <div style={{ gridArea: 'text' }}>
  <p>
  Slash is a collection of TypeScript/JavaScript packages used in <a href="https://toss.im">Toss</a>.
  </p>

<p>It provides over 30 npm packages which can serve as a foundation to provide high-quality web services.</p>

<p>
  Use <code>⌘ + K</code> to search through our libraries documentation.
</p>

  </div>

  <div style={{ gridArea: 'image', textAlign: 'center' }}>
  <video class="key-video" src="https://static.toss.im/assets/slash-libraries/keyvis.mp4" autoplay="true" muted="true" playsInline="true" loop="true" />
  </div>
</div>

<style
  dangerouslySetInnerHTML={{
    __html: `
.mainpage_hero {
  display: grid;
}

@media (min-width: 600px) {
  .mainpage_hero {
    grid-template-areas: "text image";
    grid-template-columns: 1fr 300px;
  }

  .key-video {
    width: 260px;
    height: 146px;
  }
}

@media (max-width: 600px) {
  .mainpage_hero {
    grid-template-areas: "image" "text";
    grid-template-rows: min-content min-content;
  }

  .key-video {
    width: 80%;
    margin: 24px auto;
  }
}
`,
  }}
></style>

<div style={{ height: 24 }} />

## Featured libraries

- [**@toss/use-overlay**](https://slash.page/libraries/react/use-overlay/src/useOverlay.i18n) provides the `useOverlay` React hook to control overlays in a declarative way.
- [**@toss/react**](https://slash.page/libraries/react/react/src/components/ClickArea/ClickArea.tsx.tossdocs) provides several React components and hooks to develop high-quality web services.
- [**@toss/utils**](https://slash.page/libraries/common/utils/) provides simple and modern helper libraries which can be used both in Node.js and browser environments.
- [**@toss/hangul**](https://slash.page/libraries/common/hangul/) provides utility functions to manipulate [hangul](https://en.wikipedia.org/wiki/Hangul) characters.

<div style={{ height: 24 }} />

## More reading

- [Contributing](https://github.com/toss/slash/blob/main/.github/CONTRIBUTING.md)
