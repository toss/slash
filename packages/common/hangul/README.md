---
hide_title: true
sidebar_label: '라이브러리 소개'
---

# @toss/hangul

한글 관련 라이브러리 입니다.

## 어떤 경우 사용하나요?

대표적으로 아래의 경우 사용합니다.

- 김토스가, 김프챕이 와 같이 "은는이가" 를 판단해줘야하는 경우 `josa` 를 사용합니다.
- 한글검색 및 초성검색이 필요한 경우 (e.g. 연락처 검색)
  - `hangulIncludes('김토스', '김토')`
  - `chosungIncludes('김토스', 'ㄱㅌㅅ')`
