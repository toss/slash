# @toss/storage

Web Storage is not available in some browser's incognito mode, test environment, etc. When you access `window.localStorage` or `window.sessionStorage` in one of those cases, an error would be thrown.

A library `@toss/storage` provides a safe Web Storage accessor for those cases. And a subpath exported module `@toss/storage/typed` makes Web Storage type-safe.
