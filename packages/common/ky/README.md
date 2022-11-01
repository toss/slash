# @toss/ky

A library which wraps [ky](https://github.com/sindresorhus/ky) to be compliant to both CommonJS and ECMAScript Modules.

Check out the [ky docs](https://github.com/sindresorhus/ky) for usage.

```shell
$ node
> require("@toss/ky")
# -> Available

> await import("@toss/ky")
# -> Available
```

## Motivation

`ky` has the following problems.

- Since it is ESM-only, `require()` calls fail.
- For server-side rendering, we should use the separate `ky-universal` library.

`@toss/ky` improves `ky` to be used easily.

- It is compiled beforehand with ESBuild, enabling it to be used both in CommonJS and ESM.
- Even in server-side rendered services, you could only use `@toss/ky`, not having to think about what to use between `ky-universal` and `ky`.

## Why are the build results version controlled?

- When the built code is not version controlled, we cannot run tests in the workspace, since `require('ky')` is run and `ERR_REQUIRE_ESM` errors are thrown.
- To update the built code, run `yarn build` in the package, and commit the diffs.
