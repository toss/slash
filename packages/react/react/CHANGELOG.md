# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.8.1](https://github.com/toss/slash/compare/@toss/react@1.8.0...@toss/react@1.8.1) (2024-10-24)

**Note:** Version bump only for package @toss/react





# [1.8.0](https://github.com/toss/slash/compare/@toss/react@1.7.0...@toss/react@1.8.0) (2024-10-24)


### Bug Fixes

* **@toss/react:** @toss/react State synchronization issue in useStorageState ([#478](https://github.com/toss/slash/issues/478)) ([ccc78b3](https://github.com/toss/slash/commit/ccc78b33302da055e2c35a7f45c97d94ff69e648))
* **@toss/react:** add useOutsideClickEffect dependency for preventing keep add and remove eventlistener ([#453](https://github.com/toss/slash/issues/453)) ([2ef5b0f](https://github.com/toss/slash/commit/2ef5b0fe38bbe4be1f157cdbfc58455b9f68c7b7)), closes [#420](https://github.com/toss/slash/issues/420) [#420](https://github.com/toss/slash/issues/420)
* **@toss/react:** change container array conversion logic, change useEffect order to improve readability, add dependencies ([#481](https://github.com/toss/slash/issues/481)) ([cbd7278](https://github.com/toss/slash/commit/cbd72780a28eeab4812d5d83a03d5db3262993d8))
* **@toss/react:** Remove touchStart event listener from useOutsideClickEffect ([#451](https://github.com/toss/slash/issues/451)) ([08983ce](https://github.com/toss/slash/commit/08983ce4e0967523ad0fef8ce2a0429fca9704d0))
* **@toss/react, @toss/use-loading:** implement `useIsMountedRef` and modified `useLoading` to avoid state updates when the component is unmounted ([#296](https://github.com/toss/slash/issues/296)) ([d96b004](https://github.com/toss/slash/commit/d96b00406359981b556b47f1c51962cb8d8c80e9))


### Features

* **@toss/react:** add displayName to Context in the development environment ([#459](https://github.com/toss/slash/issues/459)) ([d2e6ca4](https://github.com/toss/slash/commit/d2e6ca4ac38a1f213152e27a581e74fd0bbd6bde))
* **@toss/react:** OutsideClick Component ([#482](https://github.com/toss/slash/issues/482)) ([0beaed1](https://github.com/toss/slash/commit/0beaed14ce3053fbd77247962e1a5da9308ff065))
* **@toss/react:** Support stop & resume in useInterval ([#476](https://github.com/toss/slash/issues/476)) ([17e900d](https://github.com/toss/slash/commit/17e900dddec43c3404da9bc70cefe07b04f12a7c))





# [1.7.0](https://github.com/toss/slash/compare/@toss/react@1.6.1...@toss/react@1.7.0) (2024-03-26)


### Bug Fixes

* **react, lotti:** remove duplicate code ([#347](https://github.com/toss/slash/issues/347)) ([397a69b](https://github.com/toss/slash/commit/397a69b2ea64617888caf22cbf23b10663bd56ad))


### Features

* **packages:** add repository information in package.json ([#446](https://github.com/toss/slash/issues/446)) ([063cc5d](https://github.com/toss/slash/commit/063cc5d4699b1ba0dc20db3d2bb7dc673947500b))





# [1.6.0](https://github.com/toss/slash/compare/@toss/react@1.5.0...@toss/react@1.6.0) (2023-10-04)

### Bug Fixes

* **@toss/react:** Add dependency array to useTimeout and rename timeoutId ([#325](https://github.com/toss/slash/issues/325)) ([f78d558](https://github.com/toss/slash/commit/f78d558de44a6101129dcb124202999ee58e6617))
* **@toss/react:** Improve literal type inference ([#292](https://github.com/toss/slash/issues/292)) ([858b428](https://github.com/toss/slash/commit/858b4283a5b60679e8e32c51f24963e1bf494507))

### Features

* **@toss/react:** Add useIsMounted Test Code ([#299](https://github.com/toss/slash/issues/299)) ([6dc32b3](https://github.com/toss/slash/commit/6dc32b336f5f40c3b8bf35d24f51bc41df938973))
* **@toss/react:** Merge @tossteam/react ([#311](https://github.com/toss/slash/issues/311)) ([dea843f](https://github.com/toss/slash/commit/dea843fca8d15d7e7f74f98c670a93d706cf1bbd))

# [1.5.0](https://github.com/toss/slash/compare/@toss/react@1.4.0...@toss/react@1.5.0) (2023-07-03)

### Features

* **@toss/react:** Add useToggleState Hook  ([#273](https://github.com/toss/slash/issues/273)) ([846c7d1](https://github.com/toss/slash/commit/846c7d15720be05647c0af33685c3d8b2989fc64))

# [1.4.0](https://github.com/toss/slash/compare/@toss/react@1.3.8...@toss/react@1.4.0) (2023-06-13)

### Features

* **@toss/storage:** add clear method ([#233](https://github.com/toss/slash/issues/233)) ([4b66f22](https://github.com/toss/slash/commit/4b66f225f8b41315e5e6a2fa54a7886c83343539))

## [1.3.8](https://github.com/toss/slash/compare/@toss/react@1.3.7...@toss/react@1.3.8) (2023-04-12)

**Note:** Version bump only for package @toss/react

## [1.3.7](https://github.com/toss/slash/compare/@toss/react@1.3.6...@toss/react@1.3.7) (2023-03-13)

### Bug Fixes

* **react:** infer defaultValue as primitive type ([#223](https://github.com/toss/slash/issues/223)) ([cbead2a](https://github.com/toss/slash/commit/cbead2a5e5dbe8eaf48f2292b27e9b25a09ba85d))

## [1.3.6](https://github.com/toss/slash/compare/@toss/react@1.3.5...@toss/react@1.3.6) (2023-02-27)

### Performance Improvements

* **react:** make correct way to use useCallback's dependencyList in useCombinedRefs ([#213](https://github.com/toss/slash/issues/213)) ([6cd77f1](https://github.com/toss/slash/commit/6cd77f17e7369ab3c3e10d72c6d447636d5800f0))

## [1.3.5](https://github.com/toss/slash/compare/@toss/react@1.3.4...@toss/react@1.3.5) (2023-01-09)

### Bug Fixes

* **react:** Don’t fire `onClick` if`ClickArea` is disabled ([#174](https://github.com/toss/slash/issues/174)) ([64cb43f](https://github.com/toss/slash/commit/64cb43f288b8d1321c235d7852e15db1b67ee69d))
* **react:** fix @toss/react to support esm ([#179](https://github.com/toss/slash/issues/179)) ([3fe4d0a](https://github.com/toss/slash/commit/3fe4d0a9bf19c93f7760514e8f8a649f25f49081))
* remove unnecessary files of all packages ([#165](https://github.com/toss/slash/issues/165)) ([d883a0b](https://github.com/toss/slash/commit/d883a0b2aebdbc2ca39c67902cec754c63921dfe))

## [1.3.4](https://github.com/toss/slash/compare/@toss/react@1.3.3...@toss/react@1.3.4) (2022-12-06)

**Note:** Version bump only for package @toss/react

## [1.3.3](https://github.com/toss/slash/compare/@toss/react@1.3.2...@toss/react@1.3.3) (2022-11-16)

**Note:** Version bump only for package @toss/react

## [1.3.2](https://github.com/toss/slash/compare/@toss/react@1.3.1...@toss/react@1.3.2) (2022-11-15)

**Note:** Version bump only for package @toss/react

## [1.3.1](https://github.com/toss/slash/compare/@toss/react@1.3.0...@toss/react@1.3.1) (2022-11-14)

**Note:** Version bump only for package @toss/react

# [1.3.0](https://github.com/toss/slash/compare/@toss/react@1.2.0...@toss/react@1.3.0) (2022-11-10)

### Features

* **rollup-config:** Make rollup-config public ([#125](https://github.com/toss/slash/issues/125)) ([f6370e8](https://github.com/toss/slash/commit/f6370e8c4b0fa926e923b518c26b7071ee0e53da))

# [1.2.0](https://github.com/toss/slash/compare/@toss/react@1.1.3...@toss/react@1.2.0) (2022-11-01)

### Bug Fixes

* **react:** added missing export in hooks/index.ts ([#74](https://github.com/toss/slash/issues/74)) ([d969725](https://github.com/toss/slash/commit/d969725917b41248e9c2c42bf971e502a6abd9b2))
* **react:** preserves a reference of options parameter of useThrottle ([#96](https://github.com/toss/slash/issues/96)) ([477ac5d](https://github.com/toss/slash/commit/477ac5d795857266df3f55cd719e391b14454cda))
* **react:** remove unused file and dependencies ([#69](https://github.com/toss/slash/issues/69)) ([1eba6e0](https://github.com/toss/slash/commit/1eba6e0e99cc83e822c69a21b5605156cb9be813))
* **react:** replace all default export of components with named export ([#77](https://github.com/toss/slash/issues/77)) ([d176612](https://github.com/toss/slash/commit/d1766120e6ee0748dfb52a7f740640fc442188ff))
* **react:** specify type for dependency array ([#106](https://github.com/toss/slash/issues/106)) ([291e583](https://github.com/toss/slash/commit/291e58359f018a25620a21358e94d177262f9a55))

### Features

* **react:** add options in useDebounce hook ([#95](https://github.com/toss/slash/issues/95)) ([88babe6](https://github.com/toss/slash/commit/88babe68cb86580f2c03c7d7d29a0cd99dfac6bf))

## [1.1.3](https://github.com/toss/slash/compare/@toss/react@1.1.2...@toss/react@1.1.3) (2022-10-18)

**Note:** Version bump only for package @toss/react

## [1.1.2](https://github.com/toss/slash/compare/@toss/react@1.1.1...@toss/react@1.1.2) (2022-10-12)

**Note:** Version bump only for package @toss/react

## [1.1.1](https://github.com/toss/slash/compare/@toss/react@1.1.0...@toss/react@1.1.1) (2022-10-12)

### Bug Fixes

* Fix type error in @toss/react ([5cc3793](https://github.com/toss/slash/commit/5cc37936e8739204f32f9f50ee61570b758343f8))

# [1.1.0](https://github.com/toss/slash/compare/@toss/react@1.0.0...@toss/react@1.1.0) (2022-10-11)

### Bug Fixes

* remove unnecessary logic in useBodyClass ([#19](https://github.com/toss/slash/issues/19)) ([68ca887](https://github.com/toss/slash/commit/68ca88745beaf6d1925b0a4285c680c168161d10))

### Features

* use-ref-effect와 use-preserved-callback을 toss/react로 옮깁니다 ([#17](https://github.com/toss/slash/issues/17)) ([d9dc52a](https://github.com/toss/slash/commit/d9dc52a092d317fc873a0c41de96296f442756d8))
