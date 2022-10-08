---
hide_title: true
sidebar_label: '라이브러리 소개'
---

# @toss/storage

Web Storage(Local/Session Storage)를 안전하고, type-safe하게 사용하도록 돕는 라이브러리입니다.

## 설치하기

```shell
yarn add @toss/storage
```

## 무엇을 해결해 주나요?

- `@toss/storage`

  - Web Storage를 사용할 수 없는 환경이 존재합니다.
    - 브라우저별 구현 차이(시크릿 모드 등)
    - 테스트 환경
    - ...
  - 개발자가 그런 환경을 고려하지 않고 코드를 작성할 수 있게 도와줍니다.

- `@toss/storage/typed`
  - Web Storage를 사용할 때마다 아래의 로직을 반복적으로 작성하게 되는 경향이 있습니다.
    - JSON parse/stringify
    - 위 과정에서의 실패를 대비한 try/catch
    - TypeScript에서 사용하기 위한 Type Assertion
    - ...
  - 위 로직들을 추상화하여 개발자가 빠르고 편리하게 코드를 작성할 수 있게 도와줍니다.
