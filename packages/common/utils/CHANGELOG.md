# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.6.1](https://github.com/toss/slash/compare/@toss/utils@1.6.0...@toss/utils@1.6.1) (2024-10-24)


### Bug Fixes

* **utils:** Fix missing exports in utils ([8b97f9a](https://github.com/toss/slash/commit/8b97f9a2e87419afe2324cad281d18f2b53b3ee4))





# [1.6.0](https://github.com/toss/slash/compare/@toss/utils@1.5.0...@toss/utils@1.6.0) (2024-10-24)


### Bug Fixes

* **@toss/utils:** correct hex validation to prevent unexpected color parsing ([#458](https://github.com/toss/slash/issues/458)) ([3853784](https://github.com/toss/slash/commit/38537845e586556863f0c126e63da1aea7aa0907))
* **@toss/utils:** replace 힇 to 힣 ([#492](https://github.com/toss/slash/issues/492)) ([5d6d291](https://github.com/toss/slash/commit/5d6d291ed1a76b9c8db90d9f6c160a080cc89001))


### Features

* **utils:** Notify that some functions were moved to es-toolkit ([16159d1](https://github.com/toss/slash/commit/16159d1869743ace6d6f6b25445bad03374fd6d3))
* format 12-length phone number ([#470](https://github.com/toss/slash/issues/470)) ([e4f221f](https://github.com/toss/slash/commit/e4f221fb8d82461c4214836b8d4531e3bf08de00))





# [1.5.0](https://github.com/toss/slash/compare/@toss/utils@1.4.6...@toss/utils@1.5.0) (2024-03-26)


### Bug Fixes

* **@toss/utils:** Add 'Deno' in globalThis for isServer() ([#447](https://github.com/toss/slash/issues/447)) ([798e2dc](https://github.com/toss/slash/commit/798e2dcd40d2774655fdb31d00282b060e81d256))
* **@toss/utils:** ceilUnit parameter was missing ([#371](https://github.com/toss/slash/issues/371)) ([f0dc25d](https://github.com/toss/slash/commit/f0dc25d3247a14ee1a90b4dd732512240a3dac9f))
* hypen -> hyphen ([#391](https://github.com/toss/slash/issues/391)) ([fd23662](https://github.com/toss/slash/commit/fd236628a000b1533e45b1a0fe3c404aceebfcba))


### Features

* **@toss/utils:** Add `isNil` util function ([#423](https://github.com/toss/slash/issues/423)) ([556ab99](https://github.com/toss/slash/commit/556ab99a33d017ce9de7b582d01762d76eec4c8e))
* **@toss/utils:** Add delay test code and match parameter ([#388](https://github.com/toss/slash/issues/388)) ([389147e](https://github.com/toss/slash/commit/389147e7e3d56c2312c93452612a733f492d3380))
* **@toss/utils:** Translate tests codes for `escapeHTML` and update docs to match parameter name ([a732221](https://github.com/toss/slash/commit/a732221611579922240720d6973ea9f875975f43))
* **packages:** add repository information in package.json ([#446](https://github.com/toss/slash/issues/446)) ([063cc5d](https://github.com/toss/slash/commit/063cc5d4699b1ba0dc20db3d2bb7dc673947500b))





## [1.4.5](https://github.com/toss/slash/compare/@toss/utils@1.4.4...@toss/utils@1.4.5) (2023-10-04)

### Bug Fixes

* **@toss/utils:** Merge with internal `@tossteam/utils` library ([#319](https://github.com/toss/slash/issues/319)) ([f046eaa](https://github.com/toss/slash/commit/f046eaa50236526c91166d730b0b659caf4141d2))
* **utils:** Merge @tossteam/utils ([#302](https://github.com/toss/slash/issues/302)) ([9b5fda6](https://github.com/toss/slash/commit/9b5fda64696cdf90f004c90a37ad1e6c9d59bace))

## [1.4.4](https://github.com/toss/slash/compare/@toss/utils@1.4.3...@toss/utils@1.4.4) (2023-07-03)

### Bug Fixes

* **@toss/utils:** Fix circular dependency warning ([#270](https://github.com/toss/slash/issues/270)) ([6c3ef2f](https://github.com/toss/slash/commit/6c3ef2f095c547a6d016c5fedca67f5235c1ee0b))

## [1.4.3](https://github.com/toss/slash/compare/@toss/utils@1.4.2...@toss/utils@1.4.3) (2023-06-13)

### Bug Fixes

* **utils:** fix typo ([#258](https://github.com/toss/slash/issues/258)) ([132ccb0](https://github.com/toss/slash/commit/132ccb0a670a7edf2f2a1d245f9ac9ae4e8a383b))

## [1.4.2](https://github.com/toss/slash/compare/@toss/utils@1.4.1...@toss/utils@1.4.2) (2023-04-12)

**Note:** Version bump only for package @toss/utils

## [1.4.1](https://github.com/toss/slash/compare/@toss/utils@1.4.0...@toss/utils@1.4.1) (2023-03-13)

**Note:** Version bump only for package @toss/utils

# [1.4.0](https://github.com/toss/slash/compare/@toss/utils@1.3.1...@toss/utils@1.4.0) (2023-02-27)

### Bug Fixes

* **utils:** remove Objectkey type in pick function ([#215](https://github.com/toss/slash/issues/215)) ([828bd50](https://github.com/toss/slash/commit/828bd50fd3e2c64fd59a6ac305f86ae7fd2ffde4))

### Features

* **utils:** change unknown to any in value part of Record ([#216](https://github.com/toss/slash/issues/216)) ([7f4fe99](https://github.com/toss/slash/commit/7f4fe99dd16772a0b5a3f0ab8e89428f7ae39835))

## [1.3.1](https://github.com/toss/slash/compare/@toss/utils@1.3.0...@toss/utils@1.3.1) (2023-01-09)

### Bug Fixes

* **utils:** Fix clamp return wrong value when value is smaller than min value ([#185](https://github.com/toss/slash/issues/185)) ([f6f7e49](https://github.com/toss/slash/commit/f6f7e49c9e11850c06c7fc4b3e7411a355420a9a))
* remove unnecessary files of all packages ([#165](https://github.com/toss/slash/issues/165)) ([d883a0b](https://github.com/toss/slash/commit/d883a0b2aebdbc2ca39c67902cec754c63921dfe))

# [1.3.0](https://github.com/toss/slash/compare/@toss/utils@1.2.2...@toss/utils@1.3.0) (2022-12-06)

### Features

* **utility-types:** arrayElements type  ([#152](https://github.com/toss/slash/issues/152)) ([6a6451c](https://github.com/toss/slash/commit/6a6451c237ec09dabd1b6ce4d2cba43d2db6bf4c))
* **utils:** Add pick function for util object ([#147](https://github.com/toss/slash/issues/147)) ([e005b01](https://github.com/toss/slash/commit/e005b01a83ca48ac9bfade1979d7897736d7d483))
* **utils:** Allow generic argument in `get` ([#154](https://github.com/toss/slash/issues/154)) ([7538184](https://github.com/toss/slash/commit/7538184655a9c023f35b6fe64c9e46386e5a10f2))

## [1.2.2](https://github.com/toss/slash/compare/@toss/utils@1.2.1...@toss/utils@1.2.2) (2022-11-16)

**Note:** Version bump only for package @toss/utils

## [1.2.1](https://github.com/toss/slash/compare/@toss/utils@1.2.0...@toss/utils@1.2.1) (2022-11-15)

**Note:** Version bump only for package @toss/utils

# [1.2.0](https://github.com/toss/slash/compare/@toss/utils@1.1.0...@toss/utils@1.2.0) (2022-11-14)

### Features

* **utils:** Add `omit` ([#137](https://github.com/toss/slash/issues/137)) ([2df87c6](https://github.com/toss/slash/commit/2df87c63872fa84daa8d90e0c93515811ebd86c3))
* **utils:** write test code if it is not Korean name ([#132](https://github.com/toss/slash/issues/132)) ([8ae070e](https://github.com/toss/slash/commit/8ae070eebd6a4f393d6b23f4b27855b2877288ba))

# [1.1.0](https://github.com/toss/slash/compare/@toss/utils@1.0.5...@toss/utils@1.1.0) (2022-11-10)

### Bug Fixes

* **utils:** fix incorrect example in docs & add test code ([#111](https://github.com/toss/slash/issues/111)) ([05376c6](https://github.com/toss/slash/commit/05376c60583e6ccf6ef6153cb79a4d46a32b7ae6))

### Features

* **rollup-config:** Make rollup-config public ([#125](https://github.com/toss/slash/issues/125)) ([f6370e8](https://github.com/toss/slash/commit/f6370e8c4b0fa926e923b518c26b7071ee0e53da))

## [1.0.5](https://github.com/toss/slash/compare/@toss/utils@1.0.4...@toss/utils@1.0.5) (2022-11-01)

### Bug Fixes

* **utils:** fix commaize not working in RN ([#104](https://github.com/toss/slash/issues/104)) ([11bd50d](https://github.com/toss/slash/commit/11bd50d2bcb15d4fc865b57bd5c8d22ef3d748f3))
* **utils:** fix mapValues type error ([#60](https://github.com/toss/slash/issues/60)) ([0590556](https://github.com/toss/slash/commit/05905560262ec3cf0ae1390081abb8d882265e86))

## [1.0.4](https://github.com/toss/slash/compare/@toss/utils@1.0.3...@toss/utils@1.0.4) (2022-10-18)

### Bug Fixes

* **utils:** error handling for clamp function ([#37](https://github.com/toss/slash/issues/37)) ([3e002ac](https://github.com/toss/slash/commit/3e002ac97e8a09f1d5c19725daf591c086a85445))
* **utils:** relocate file location isDifferentArray function ([#52](https://github.com/toss/slash/issues/52)) ([75b5932](https://github.com/toss/slash/commit/75b593207ab4382151f552b4fc170e4b25b52b6b))
* **utils:** remove redundant template literal type in ObjectKeys ([#61](https://github.com/toss/slash/issues/61)) ([c4acf0b](https://github.com/toss/slash/commit/c4acf0b8a1120af842c065deb6bf08fd5a2e81d2))
* **utils:** rewrite test description for clamp function ([#50](https://github.com/toss/slash/issues/50)) ([9d7e623](https://github.com/toss/slash/commit/9d7e623a6f690855a774109365d774fd2c75e330))

## [1.0.3](https://github.com/toss/slash/compare/@toss/utils@1.0.2...@toss/utils@1.0.3) (2022-10-12)

**Note:** Version bump only for package @toss/utils

## [1.0.2](https://github.com/toss/slash/compare/@toss/utils@1.0.1...@toss/utils@1.0.2) (2022-10-12)

### Bug Fixes

* Fix type error in @toss/react ([5cc3793](https://github.com/toss/slash/commit/5cc37936e8739204f32f9f50ee61570b758343f8))

## [1.0.1](https://github.com/toss/slash/compare/@toss/utils@1.0.0...@toss/utils@1.0.1) (2022-10-11)

**Note:** Version bump only for package @toss/utils
