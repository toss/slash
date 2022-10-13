---
hide_title: true
sidebar_label: 'Introduction'
---

# @toss/hangul

A library to handle [Hangul](https://en.wikipedia.org/wiki/Hangul) (Korean) characters, in modern JavaScript.

## Motivation

In Korean services, there are cases where we have to handle Hangul characters in a sophisticated way.

For example, when searching among Korean strings, most Koreans expect for the string `토스` to be included in the results when the keyword is `톳`.

Also, many Koreans search with [initial consonants (chosung)](https://en.wikipedia.org/wiki/Hangul_consonant_and_vowel_tables). They expect `토스` to be searched with the string `ㅌㅅ`.

`@toss/hangul` provides fundamental constructs to handle these Hangul strings.

## Function list

- [chosungIncludes](https://slash.page/libraries/common/hangul/src/chosungIncludes.i18n)
- [disassembleHangul](https://slash.page/libraries/common/hangul/src/disassembleHangul.i18n)
- [disassembleHangulToGroups](https://slash.page/libraries/common/hangul/src/disassembleHangulToGroups.i18n)
- [hangulIncludes](https://slash.page/libraries/common/hangul/src/hangulIncludes.i18n)
- [josa](https://slash.page/libraries/common/hangul/src/josa.i18n)
