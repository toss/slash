# @toss/hangul

현대적인 JavaScript로 한글을 다루는 라이브러리입니다.

## 지원 종료 안내

`@toss/hangul`은 더 이상 지원되지 않습니다. 새로운 패키지 `es-hangul`로 전환되었으며, 이는 기능성과 성능이 개선되었습니다.

### 추천 조치 사항:

- 의존성을 `es-hangul`로 업데이트하세요.
- 새 기능과 구현 세부사항에 대해서는 `es-hangul` 문서를 참고해 주세요.

지속적인 지원과 이해에 감사드립니다.

## 문서

`es-hangul`에 대한 자세한 정보는 [es-hangul 문서](https://es-hangul.slash.page/)에서 확인하실 수 있습니다.

## 배경

한국어로 된 서비스에서 검색과 같은 기능을 개발할 때, 한글 문자열을 정교하게 다루어야 하는 경우가 생깁니다.

예를 들어서, 검색어가 `톳` 일 때, `토스` 문자열이 검색되어야 합니다. 또한, `토스` 문자열은 `ㅌㅅ`처럼 초성으로도 검색할 수 있어야 합니다.

이런 작업을 할 때 사용할 수 있도록 `@toss/hangul` 라이브러리는 기본적인 함수를 제공합니다.

## 제공하는 함수 리스트

- [chosungIncludes](https://slash.page/ko/libraries/common/hangul/src/chosungIncludes.i18n)
- [disassembleHangul](https://slash.page/ko/libraries/common/hangul/src/disassemble.i18n)
- [disassembleHangulToGroups](https://slash.page/ko/libraries/common/hangul/src/disassemble.i18n)
- [hangulIncludes](https://slash.page/ko/libraries/common/hangul/src/hangulIncludes.i18n)
- [josa](https://slash.page/ko/libraries/common/hangul/src/josa.i18n)
