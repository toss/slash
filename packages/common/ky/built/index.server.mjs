/* eslint-disable */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x2 + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/web-streams-polyfill-npm-3.2.1-835bd3857e-b119c78574.zip/node_modules/web-streams-polyfill/dist/ponyfill.es2018.js
var require_ponyfill_es2018 = __commonJS({
  "pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/web-streams-polyfill-npm-3.2.1-835bd3857e-b119c78574.zip/node_modules/web-streams-polyfill/dist/ponyfill.es2018.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.WebStreamsPolyfill = {}));
    })(exports, function(exports2) {
      "use strict";
      const SymbolPolyfill2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
      function noop3() {
        return void 0;
      }
      function getGlobals2() {
        if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else if (typeof global !== "undefined") {
          return global;
        }
        return void 0;
      }
      const globals2 = getGlobals2();
      function typeIsObject2(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      const rethrowAssertionErrorRejection2 = noop3;
      const originalPromise2 = Promise;
      const originalPromiseThen2 = Promise.prototype.then;
      const originalPromiseResolve2 = Promise.resolve.bind(originalPromise2);
      const originalPromiseReject2 = Promise.reject.bind(originalPromise2);
      function newPromise2(executor) {
        return new originalPromise2(executor);
      }
      function promiseResolvedWith2(value) {
        return originalPromiseResolve2(value);
      }
      function promiseRejectedWith2(reason) {
        return originalPromiseReject2(reason);
      }
      function PerformPromiseThen2(promise, onFulfilled, onRejected) {
        return originalPromiseThen2.call(promise, onFulfilled, onRejected);
      }
      function uponPromise2(promise, onFulfilled, onRejected) {
        PerformPromiseThen2(PerformPromiseThen2(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection2);
      }
      function uponFulfillment2(promise, onFulfilled) {
        uponPromise2(promise, onFulfilled);
      }
      function uponRejection2(promise, onRejected) {
        uponPromise2(promise, void 0, onRejected);
      }
      function transformPromiseWith2(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen2(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue2(promise) {
        PerformPromiseThen2(promise, void 0, rethrowAssertionErrorRejection2);
      }
      const queueMicrotask2 = (() => {
        const globalQueueMicrotask = globals2 && globals2.queueMicrotask;
        if (typeof globalQueueMicrotask === "function") {
          return globalQueueMicrotask;
        }
        const resolvedPromise = promiseResolvedWith2(void 0);
        return (fn) => PerformPromiseThen2(resolvedPromise, fn);
      })();
      function reflectCall2(F2, V, args) {
        if (typeof F2 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F2, V, args);
      }
      function promiseCall2(F2, V, args) {
        try {
          return promiseResolvedWith2(reflectCall2(F2, V, args));
        } catch (value) {
          return promiseRejectedWith2(value);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE2 = 16384;
      class SimpleQueue2 {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(element) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE2 - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE2) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element;
        }
        forEach(callback) {
          let i2 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i2 !== elements.length || node._next !== void 0) {
            if (i2 === elements.length) {
              node = node._next;
              elements = node._elements;
              i2 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i2]);
            ++i2;
          }
        }
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      function ReadableStreamReaderGenericInitialize2(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize2(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved2(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected2(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel2(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel2(stream, reason);
      }
      function ReadableStreamReaderGenericRelease2(reader) {
        if (reader._ownerReadableStream._state === "readable") {
          defaultReaderClosedPromiseReject2(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected2(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        reader._ownerReadableStream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException2(name) {
        return new TypeError("Cannot " + name + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize2(reader) {
        reader._closedPromise = newPromise2((resolve, reject) => {
          reader._closedPromise_resolve = resolve;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected2(reader, reason) {
        defaultReaderClosedPromiseInitialize2(reader);
        defaultReaderClosedPromiseReject2(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved2(reader) {
        defaultReaderClosedPromiseInitialize2(reader);
        defaultReaderClosedPromiseResolve2(reader);
      }
      function defaultReaderClosedPromiseReject2(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue2(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected2(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected2(reader, reason);
      }
      function defaultReaderClosedPromiseResolve2(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const AbortSteps2 = SymbolPolyfill2("[[AbortSteps]]");
      const ErrorSteps2 = SymbolPolyfill2("[[ErrorSteps]]");
      const CancelSteps2 = SymbolPolyfill2("[[CancelSteps]]");
      const PullSteps2 = SymbolPolyfill2("[[PullSteps]]");
      const NumberIsFinite2 = Number.isFinite || function(x2) {
        return typeof x2 === "number" && isFinite(x2);
      };
      const MathTrunc2 = Math.trunc || function(v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
      function isDictionary2(x2) {
        return typeof x2 === "object" || typeof x2 === "function";
      }
      function assertDictionary2(obj, context) {
        if (obj !== void 0 && !isDictionary2(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction2(x2, context) {
        if (typeof x2 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject4(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      function assertObject2(x2, context) {
        if (!isObject4(x2)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument2(x2, position, context) {
        if (x2 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField2(x2, field, context) {
        if (x2 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble2(value) {
        return Number(value);
      }
      function censorNegativeZero2(x2) {
        return x2 === 0 ? 0 : x2;
      }
      function integerPart2(x2) {
        return censorNegativeZero2(MathTrunc2(x2));
      }
      function convertUnsignedLongLongWithEnforceRange2(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x2 = Number(value);
        x2 = censorNegativeZero2(x2);
        if (!NumberIsFinite2(x2)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x2 = integerPart2(x2);
        if (x2 < lowerBound || x2 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite2(x2) || x2 === 0) {
          return 0;
        }
        return x2;
      }
      function assertReadableStream2(x2, context) {
        if (!IsReadableStream2(x2)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader2(stream) {
        return new ReadableStreamDefaultReader2(stream);
      }
      function ReadableStreamAddReadRequest2(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest2(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests2(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader2(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader2(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader2 {
        constructor(stream) {
          assertRequiredArgument2(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream2(stream, "First parameter");
          if (IsReadableStreamLocked2(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize2(this, stream);
          this._readRequests = new SimpleQueue2();
        }
        get closed() {
          if (!IsReadableStreamDefaultReader2(this)) {
            return promiseRejectedWith2(defaultReaderBrandCheckException2("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader2(this)) {
            return promiseRejectedWith2(defaultReaderBrandCheckException2("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith2(readerLockException2("cancel"));
          }
          return ReadableStreamReaderGenericCancel2(this, reason);
        }
        read() {
          if (!IsReadableStreamDefaultReader2(this)) {
            return promiseRejectedWith2(defaultReaderBrandCheckException2("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith2(readerLockException2("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise2((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamDefaultReaderRead2(this, readRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamDefaultReader2(this)) {
            throw defaultReaderBrandCheckException2("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease2(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader2.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader2.prototype, SymbolPolyfill2.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultReader2;
      }
      function ReadableStreamDefaultReaderRead2(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps2](readRequest);
        }
      }
      function defaultReaderBrandCheckException2(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype2 = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl2 {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith2(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value) {
          const returnSteps = () => this._returnSteps(value);
          return this._ongoingPromise ? transformPromiseWith2(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith2(readerLockException2("iterate"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise2((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              queueMicrotask2(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease2(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease2(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead2(reader, readRequest);
          return promise;
        }
        _returnSteps(value) {
          if (this._isFinished) {
            return Promise.resolve({ value, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith2(readerLockException2("finish iterating"));
          }
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel2(reader, value);
            ReadableStreamReaderGenericRelease2(reader);
            return transformPromiseWith2(result, () => ({ value, done: true }));
          }
          ReadableStreamReaderGenericRelease2(reader);
          return promiseResolvedWith2({ value, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype2 = {
        next() {
          if (!IsReadableStreamAsyncIterator2(this)) {
            return promiseRejectedWith2(streamAsyncIteratorBrandCheckException2("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value) {
          if (!IsReadableStreamAsyncIterator2(this)) {
            return promiseRejectedWith2(streamAsyncIteratorBrandCheckException2("return"));
          }
          return this._asyncIteratorImpl.return(value);
        }
      };
      if (AsyncIteratorPrototype2 !== void 0) {
        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype2, AsyncIteratorPrototype2);
      }
      function AcquireReadableStreamAsyncIterator2(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader2(stream);
        const impl = new ReadableStreamAsyncIteratorImpl2(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype2);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl2;
        } catch (_a) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException2(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN2 = Number.isNaN || function(x2) {
        return x2 !== x2;
      };
      function CreateArrayFromList2(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes2(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
      }
      function TransferArrayBuffer2(O) {
        return O;
      }
      function IsDetachedBuffer2(O) {
        return false;
      }
      function ArrayBufferSlice2(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes2(slice, 0, buffer, begin, length);
        return slice;
      }
      function IsNonNegativeNumber2(v) {
        if (typeof v !== "number") {
          return false;
        }
        if (NumberIsNaN2(v)) {
          return false;
        }
        if (v < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array2(O) {
        const buffer = ArrayBufferSlice2(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue2(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize2(container, value, size) {
        if (!IsNonNegativeNumber2(size) || size === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
      }
      function PeekQueueValue2(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue2(container) {
        container._queue = new SimpleQueue2();
        container._queueTotalSize = 0;
      }
      class ReadableStreamBYOBRequest2 {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!IsReadableStreamBYOBRequest2(this)) {
            throw byobRequestBrandCheckException2("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest2(this)) {
            throw byobRequestBrandCheckException2("respond");
          }
          assertRequiredArgument2(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange2(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer2(this._view.buffer))
            ;
          ReadableByteStreamControllerRespond2(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest2(this)) {
            throw byobRequestBrandCheckException2("respondWithNewView");
          }
          assertRequiredArgument2(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer2(view.buffer))
            ;
          ReadableByteStreamControllerRespondWithNewView2(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest2.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest2.prototype, SymbolPolyfill2.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController2 {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!IsReadableByteStreamController2(this)) {
            throw byteStreamControllerBrandCheckException2("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest2(this);
        }
        get desiredSize() {
          if (!IsReadableByteStreamController2(this)) {
            throw byteStreamControllerBrandCheckException2("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize2(this);
        }
        close() {
          if (!IsReadableByteStreamController2(this)) {
            throw byteStreamControllerBrandCheckException2("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose2(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController2(this)) {
            throw byteStreamControllerBrandCheckException2("enqueue");
          }
          assertRequiredArgument2(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue2(this, chunk);
        }
        error(e2 = void 0) {
          if (!IsReadableByteStreamController2(this)) {
            throw byteStreamControllerBrandCheckException2("error");
          }
          ReadableByteStreamControllerError2(this, e2);
        }
        [CancelSteps2](reason) {
          ReadableByteStreamControllerClearPendingPullIntos2(this);
          ResetQueue2(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms2(this);
          return result;
        }
        [PullSteps2](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            const entry = this._queue.shift();
            this._queueTotalSize -= entry.byteLength;
            ReadableByteStreamControllerHandleQueueDrain2(this);
            const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
            readRequest._chunkSteps(view);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest2(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded2(this);
        }
      }
      Object.defineProperties(ReadableByteStreamController2.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController2.prototype, SymbolPolyfill2.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
          return false;
        }
        return x2 instanceof ReadableByteStreamController2;
      }
      function IsReadableStreamBYOBRequest2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBRequest2;
      }
      function ReadableByteStreamControllerCallPullIfNeeded2(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull2(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise2(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded2(controller);
          }
        }, (e2) => {
          ReadableByteStreamControllerError2(controller, e2);
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos2(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest2(controller);
        controller._pendingPullIntos = new SimpleQueue2();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor2(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor2(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest2(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest2(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor2(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue2(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue2(controller, pullIntoDescriptor) {
        const elementSize = pullIntoDescriptor.elementSize;
        const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        if (maxAlignedBytes > currentAlignedBytes) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes2(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor2(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor2(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
      }
      function ReadableByteStreamControllerHandleQueueDrain2(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms2(controller);
          ReadableStreamClose2(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded2(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest2(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue2(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue2(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto2(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor2(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerPullInto2(controller, view, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        let elementSize = 1;
        if (view.constructor !== DataView) {
          elementSize = view.constructor.BYTES_PER_ELEMENT;
        }
        const ctor = view.constructor;
        const buffer = TransferArrayBuffer2(view.buffer);
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset: view.byteOffset,
          byteLength: view.byteLength,
          bytesFilled: 0,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest2(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue2(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor2(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain2(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError2(controller, e2);
            readIntoRequest._errorSteps(e2);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest2(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded2(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState2(controller, firstDescriptor) {
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader2(stream)) {
          while (ReadableStreamGetNumReadIntoRequests2(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto2(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor2(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState2(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor2(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto2(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          const remainder = ArrayBufferSlice2(pullIntoDescriptor.buffer, end - remainderSize, end);
          ReadableByteStreamControllerEnqueueChunkToQueue2(controller, remainder, 0, remainder.byteLength);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor2(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue2(controller);
      }
      function ReadableByteStreamControllerRespondInternal2(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest2(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          ReadableByteStreamControllerRespondInClosedState2(controller);
        } else {
          ReadableByteStreamControllerRespondInReadableState2(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded2(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto2(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull2(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader2(stream) && ReadableStreamGetNumReadRequests2(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader2(stream) && ReadableStreamGetNumReadIntoRequests2(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize2(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms2(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose2(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled > 0) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError2(controller, e2);
            throw e2;
          }
        }
        ReadableByteStreamControllerClearAlgorithms2(controller);
        ReadableStreamClose2(stream);
      }
      function ReadableByteStreamControllerEnqueue2(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const buffer = chunk.buffer;
        const byteOffset = chunk.byteOffset;
        const byteLength = chunk.byteLength;
        const transferredBuffer = TransferArrayBuffer2(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer2(firstPendingPullInto.buffer))
            ;
          firstPendingPullInto.buffer = TransferArrayBuffer2(firstPendingPullInto.buffer);
        }
        ReadableByteStreamControllerInvalidateBYOBRequest2(controller);
        if (ReadableStreamHasDefaultReader2(stream)) {
          if (ReadableStreamGetNumReadRequests2(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue2(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto2(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest2(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader2(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue2(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue2(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue2(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded2(controller);
      }
      function ReadableByteStreamControllerError2(controller, e2) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos2(controller);
        ResetQueue2(controller);
        ReadableByteStreamControllerClearAlgorithms2(controller);
        ReadableStreamError2(stream, e2);
      }
      function ReadableByteStreamControllerGetBYOBRequest2(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest2.prototype);
          SetUpReadableStreamBYOBRequest2(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize2(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond2(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer2(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal2(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView2(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer2(view.buffer);
        ReadableByteStreamControllerRespondInternal2(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController2(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue2(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue2();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise2(promiseResolvedWith2(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded2(controller);
        }, (r2) => {
          ReadableByteStreamControllerError2(controller, r2);
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource2(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController2.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith2(void 0);
        let cancelAlgorithm = () => promiseResolvedWith2(void 0);
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController2(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest2(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException2(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException2(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
      }
      function AcquireReadableStreamBYOBReader2(stream) {
        return new ReadableStreamBYOBReader2(stream);
      }
      function ReadableStreamAddReadIntoRequest2(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest2(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests2(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader2(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader2(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader2 {
        constructor(stream) {
          assertRequiredArgument2(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream2(stream, "First parameter");
          if (IsReadableStreamLocked2(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController2(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize2(this, stream);
          this._readIntoRequests = new SimpleQueue2();
        }
        get closed() {
          if (!IsReadableStreamBYOBReader2(this)) {
            return promiseRejectedWith2(byobReaderBrandCheckException2("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader2(this)) {
            return promiseRejectedWith2(byobReaderBrandCheckException2("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith2(readerLockException2("cancel"));
          }
          return ReadableStreamReaderGenericCancel2(this, reason);
        }
        read(view) {
          if (!IsReadableStreamBYOBReader2(this)) {
            return promiseRejectedWith2(byobReaderBrandCheckException2("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith2(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith2(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith2(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer2(view.buffer))
            ;
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith2(readerLockException2("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise2((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamBYOBReaderRead2(this, view, readIntoRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamBYOBReader2(this)) {
            throw byobReaderBrandCheckException2("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readIntoRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease2(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader2.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader2.prototype, SymbolPolyfill2.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBReader2;
      }
      function ReadableStreamBYOBReaderRead2(reader, view, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto2(stream._readableStreamController, view, readIntoRequest);
        }
      }
      function byobReaderBrandCheckException2(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark2(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN2(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm2(strategy) {
        const { size } = strategy;
        if (!size) {
          return () => 1;
        }
        return size;
      }
      function convertQueuingStrategy2(init, context) {
        assertDictionary2(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble2(highWaterMark),
          size: size === void 0 ? void 0 : convertQueuingStrategySize2(size, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize2(fn, context) {
        assertFunction2(fn, context);
        return (chunk) => convertUnrestrictedDouble2(fn(chunk));
      }
      function convertUnderlyingSink2(original, context) {
        assertDictionary2(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback2(abort, original, `${context} has member 'abort' that`),
          close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback2(close, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback2(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback2(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback2(fn, original, context) {
        assertFunction2(fn, context);
        return (reason) => promiseCall2(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback2(fn, original, context) {
        assertFunction2(fn, context);
        return () => promiseCall2(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback2(fn, original, context) {
        assertFunction2(fn, context);
        return (controller) => reflectCall2(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback2(fn, original, context) {
        assertFunction2(fn, context);
        return (chunk, controller) => promiseCall2(fn, original, [chunk, controller]);
      }
      function assertWritableStream2(x2, context) {
        if (!IsWritableStream2(x2)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal3(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        try {
          return typeof value.aborted === "boolean";
        } catch (_a) {
          return false;
        }
      }
      const supportsAbortController3 = typeof AbortController === "function";
      function createAbortController2() {
        if (supportsAbortController3) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream2 {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject2(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy2(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink2(rawUnderlyingSink, "First parameter");
          InitializeWritableStream2(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm2(strategy);
          const highWaterMark = ExtractHighWaterMark2(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink2(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        get locked() {
          if (!IsWritableStream2(this)) {
            throw streamBrandCheckException$22("locked");
          }
          return IsWritableStreamLocked2(this);
        }
        abort(reason = void 0) {
          if (!IsWritableStream2(this)) {
            return promiseRejectedWith2(streamBrandCheckException$22("abort"));
          }
          if (IsWritableStreamLocked2(this)) {
            return promiseRejectedWith2(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort2(this, reason);
        }
        close() {
          if (!IsWritableStream2(this)) {
            return promiseRejectedWith2(streamBrandCheckException$22("close"));
          }
          if (IsWritableStreamLocked2(this)) {
            return promiseRejectedWith2(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight2(this)) {
            return promiseRejectedWith2(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose2(this);
        }
        getWriter() {
          if (!IsWritableStream2(this)) {
            throw streamBrandCheckException$22("getWriter");
          }
          return AcquireWritableStreamDefaultWriter2(this);
        }
      }
      Object.defineProperties(WritableStream2.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(WritableStream2.prototype, SymbolPolyfill2.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter2(stream) {
        return new WritableStreamDefaultWriter2(stream);
      }
      function CreateWritableStream2(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream2.prototype);
        InitializeWritableStream2(stream);
        const controller = Object.create(WritableStreamDefaultController2.prototype);
        SetUpWritableStreamDefaultController2(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream2(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue2();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
          return false;
        }
        return x2 instanceof WritableStream2;
      }
      function IsWritableStreamLocked2(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort2(stream, reason) {
        var _a;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith2(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseResolvedWith2(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise2((resolve, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring2(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose2(stream) {
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseRejectedWith2(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise2((resolve, reject) => {
          const closeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state === "writable") {
          defaultWriterReadyPromiseResolve2(writer);
        }
        WritableStreamDefaultControllerClose2(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest2(stream) {
        const promise = newPromise2((resolve, reject) => {
          const writeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection2(stream, error) {
        const state = stream._state;
        if (state === "writable") {
          WritableStreamStartErroring2(stream, error);
          return;
        }
        WritableStreamFinishErroring2(stream);
      }
      function WritableStreamStartErroring2(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected2(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight2(stream) && controller._started) {
          WritableStreamFinishErroring2(stream);
        }
      }
      function WritableStreamFinishErroring2(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps2]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue2();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded2(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded2(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps2](abortRequest._reason);
        uponPromise2(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded2(stream);
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded2(stream);
        });
      }
      function WritableStreamFinishInFlightWrite2(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError2(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection2(stream, error);
      }
      function WritableStreamFinishInFlightClose2(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state = stream._state;
        if (state === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve2(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError2(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection2(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight2(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight2(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight2(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight2(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded2(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject2(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure2(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset2(writer);
          } else {
            defaultWriterReadyPromiseResolve2(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter2 {
        constructor(stream) {
          assertRequiredArgument2(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream2(stream, "First parameter");
          if (IsWritableStreamLocked2(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state = stream._state;
          if (state === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight2(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize2(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved2(this);
            }
            defaultWriterClosedPromiseInitialize2(this);
          } else if (state === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected2(this, stream._storedError);
            defaultWriterClosedPromiseInitialize2(this);
          } else if (state === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved2(this);
            defaultWriterClosedPromiseInitializeAsResolved2(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected2(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected2(this, storedError);
          }
        }
        get closed() {
          if (!IsWritableStreamDefaultWriter2(this)) {
            return promiseRejectedWith2(defaultWriterBrandCheckException2("closed"));
          }
          return this._closedPromise;
        }
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter2(this)) {
            throw defaultWriterBrandCheckException2("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException2("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize2(this);
        }
        get ready() {
          if (!IsWritableStreamDefaultWriter2(this)) {
            return promiseRejectedWith2(defaultWriterBrandCheckException2("ready"));
          }
          return this._readyPromise;
        }
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter2(this)) {
            return promiseRejectedWith2(defaultWriterBrandCheckException2("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith2(defaultWriterLockException2("abort"));
          }
          return WritableStreamDefaultWriterAbort2(this, reason);
        }
        close() {
          if (!IsWritableStreamDefaultWriter2(this)) {
            return promiseRejectedWith2(defaultWriterBrandCheckException2("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith2(defaultWriterLockException2("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight2(stream)) {
            return promiseRejectedWith2(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose2(this);
        }
        releaseLock() {
          if (!IsWritableStreamDefaultWriter2(this)) {
            throw defaultWriterBrandCheckException2("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease2(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter2(this)) {
            return promiseRejectedWith2(defaultWriterBrandCheckException2("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith2(defaultWriterLockException2("write to"));
          }
          return WritableStreamDefaultWriterWrite2(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter2.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter2.prototype, SymbolPolyfill2.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultWriter2;
      }
      function WritableStreamDefaultWriterAbort2(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort2(stream, reason);
      }
      function WritableStreamDefaultWriterClose2(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose2(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation2(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight2(stream) || state === "closed") {
          return promiseResolvedWith2(void 0);
        }
        if (state === "errored") {
          return promiseRejectedWith2(stream._storedError);
        }
        return WritableStreamDefaultWriterClose2(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected2(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject2(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected2(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected2(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject2(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected2(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize2(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === "errored" || state === "erroring") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize2(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease2(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected2(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected2(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite2(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize2(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith2(defaultWriterLockException2("write to"));
        }
        const state = stream._state;
        if (state === "errored") {
          return promiseRejectedWith2(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight2(stream) || state === "closed") {
          return promiseRejectedWith2(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state === "erroring") {
          return promiseRejectedWith2(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest2(stream);
        WritableStreamDefaultControllerWrite2(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel2 = {};
      class WritableStreamDefaultController2 {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!IsWritableStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException$22("abortReason");
          }
          return this._abortReason;
        }
        get signal() {
          if (!IsWritableStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException$22("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        error(e2 = void 0) {
          if (!IsWritableStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException$22("error");
          }
          const state = this._controlledWritableStream._state;
          if (state !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError2(this, e2);
        }
        [AbortSteps2](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms2(this);
          return result;
        }
        [ErrorSteps2]() {
          ResetQueue2(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController2.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController2.prototype, SymbolPolyfill2.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultController2;
      }
      function SetUpWritableStreamDefaultController2(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue2(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController2();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure2(controller);
        WritableStreamUpdateBackpressure2(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith2(startResult);
        uponPromise2(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded2(controller);
        }, (r2) => {
          controller._started = true;
          WritableStreamDealWithRejection2(stream, r2);
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink2(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController2.prototype);
        let startAlgorithm = () => void 0;
        let writeAlgorithm = () => promiseResolvedWith2(void 0);
        let closeAlgorithm = () => promiseResolvedWith2(void 0);
        let abortAlgorithm = () => promiseResolvedWith2(void 0);
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        }
        SetUpWritableStreamDefaultController2(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms2(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose2(controller) {
        EnqueueValueWithSize2(controller, closeSentinel2, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded2(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize2(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded2(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize2(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite2(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize2(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded2(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight2(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure2(controller);
          WritableStreamUpdateBackpressure2(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded2(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded2(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state = stream._state;
        if (state === "erroring") {
          WritableStreamFinishErroring2(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value = PeekQueueValue2(controller);
        if (value === closeSentinel2) {
          WritableStreamDefaultControllerProcessClose2(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite2(controller, value);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded2(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError2(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose2(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight2(stream);
        DequeueValue2(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms2(controller);
        uponPromise2(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose2(stream);
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError2(stream, reason);
        });
      }
      function WritableStreamDefaultControllerProcessWrite2(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight2(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise2(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite2(stream);
          const state = stream._state;
          DequeueValue2(controller);
          if (!WritableStreamCloseQueuedOrInFlight2(stream) && state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure2(controller);
            WritableStreamUpdateBackpressure2(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded2(controller);
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms2(controller);
          }
          WritableStreamFinishInFlightWriteWithError2(stream, reason);
        });
      }
      function WritableStreamDefaultControllerGetBackpressure2(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize2(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError2(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms2(controller);
        WritableStreamStartErroring2(stream, error);
      }
      function streamBrandCheckException$22(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$22(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException2(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException2(name) {
        return new TypeError("Cannot " + name + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize2(writer) {
        writer._closedPromise = newPromise2((resolve, reject) => {
          writer._closedPromise_resolve = resolve;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected2(writer, reason) {
        defaultWriterClosedPromiseInitialize2(writer);
        defaultWriterClosedPromiseReject2(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved2(writer) {
        defaultWriterClosedPromiseInitialize2(writer);
        defaultWriterClosedPromiseResolve2(writer);
      }
      function defaultWriterClosedPromiseReject2(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue2(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected2(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected2(writer, reason);
      }
      function defaultWriterClosedPromiseResolve2(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize2(writer) {
        writer._readyPromise = newPromise2((resolve, reject) => {
          writer._readyPromise_resolve = resolve;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected2(writer, reason) {
        defaultWriterReadyPromiseInitialize2(writer);
        defaultWriterReadyPromiseReject2(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved2(writer) {
        defaultWriterReadyPromiseInitialize2(writer);
        defaultWriterReadyPromiseResolve2(writer);
      }
      function defaultWriterReadyPromiseReject2(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue2(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset2(writer) {
        defaultWriterReadyPromiseInitialize2(writer);
      }
      function defaultWriterReadyPromiseResetToRejected2(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected2(writer, reason);
      }
      function defaultWriterReadyPromiseResolve2(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      const NativeDOMException2 = typeof DOMException !== "undefined" ? DOMException : void 0;
      function isDOMExceptionConstructor2(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a) {
          return false;
        }
      }
      function createDOMExceptionPolyfill2() {
        const ctor = function DOMException3(message, name) {
          this.message = message || "";
          this.name = name || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException$12 = isDOMExceptionConstructor2(NativeDOMException2) ? NativeDOMException2 : createDOMExceptionPolyfill2();
      function ReadableStreamPipeTo2(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader2(source);
        const writer = AcquireWritableStreamDefaultWriter2(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith2(void 0);
        return newPromise2((resolve, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = new DOMException$12("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort2(dest, error);
                  }
                  return promiseResolvedWith2(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel2(source, error);
                  }
                  return promiseResolvedWith2(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise2((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen2(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith2(true);
            }
            return PerformPromiseThen2(writer._readyPromise, () => {
              return newPromise2((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead2(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen2(WritableStreamDefaultWriterWrite2(writer, chunk), void 0, noop3);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort2(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel2(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation2(writer));
            } else {
              shutdown();
            }
          });
          if (WritableStreamCloseQueuedOrInFlight2(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel2(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue2(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen2(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection2(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment2(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight2(dest)) {
              uponFulfillment2(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise2(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight2(dest)) {
              uponFulfillment2(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease2(writer);
            ReadableStreamReaderGenericRelease2(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve(void 0);
            }
          }
        });
      }
      class ReadableStreamDefaultController2 {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsReadableStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException$12("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize2(this);
        }
        close() {
          if (!IsReadableStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException$12("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue2(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose2(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException$12("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue2(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue2(this, chunk);
        }
        error(e2 = void 0) {
          if (!IsReadableStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException$12("error");
          }
          ReadableStreamDefaultControllerError2(this, e2);
        }
        [CancelSteps2](reason) {
          ResetQueue2(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms2(this);
          return result;
        }
        [PullSteps2](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue2(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms2(this);
              ReadableStreamClose2(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded2(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest2(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded2(this);
          }
        }
      }
      Object.defineProperties(ReadableStreamDefaultController2.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController2.prototype, SymbolPolyfill2.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultController2;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded2(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull2(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise2(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded2(controller);
          }
        }, (e2) => {
          ReadableStreamDefaultControllerError2(controller, e2);
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull2(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue2(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked2(stream) && ReadableStreamGetNumReadRequests2(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize2(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms2(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose2(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue2(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms2(controller);
          ReadableStreamClose2(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue2(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue2(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked2(stream) && ReadableStreamGetNumReadRequests2(stream) > 0) {
          ReadableStreamFulfillReadRequest2(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError2(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize2(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError2(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded2(controller);
      }
      function ReadableStreamDefaultControllerError2(controller, e2) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue2(controller);
        ReadableStreamDefaultControllerClearAlgorithms2(controller);
        ReadableStreamError2(stream, e2);
      }
      function ReadableStreamDefaultControllerGetDesiredSize2(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure2(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull2(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue2(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController2(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue2(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise2(promiseResolvedWith2(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded2(controller);
        }, (r2) => {
          ReadableStreamDefaultControllerError2(controller, r2);
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource2(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController2.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith2(void 0);
        let cancelAlgorithm = () => promiseResolvedWith2(void 0);
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        }
        SetUpReadableStreamDefaultController2(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$12(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee2(stream, cloneForBranch2) {
        if (IsReadableByteStreamController2(stream._readableStreamController)) {
          return ReadableByteStreamTee2(stream);
        }
        return ReadableStreamDefaultTee2(stream);
      }
      function ReadableStreamDefaultTee2(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader2(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise2((resolve) => {
          resolveCancelPromise = resolve;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith2(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask2(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue2(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue2(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose2(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose2(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead2(reader, readRequest);
          return promiseResolvedWith2(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList2([reason1, reason2]);
            const cancelResult = ReadableStreamCancel2(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList2([reason1, reason2]);
            const cancelResult = ReadableStreamCancel2(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream2(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream2(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection2(reader._closedPromise, (r2) => {
          ReadableStreamDefaultControllerError2(branch1._readableStreamController, r2);
          ReadableStreamDefaultControllerError2(branch2._readableStreamController, r2);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee2(stream) {
        let reader = AcquireReadableStreamDefaultReader2(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise2((resolve) => {
          resolveCancelPromise = resolve;
        });
        function forwardReaderError(thisReader) {
          uponRejection2(thisReader._closedPromise, (r2) => {
            if (thisReader !== reader) {
              return;
            }
            ReadableByteStreamControllerError2(branch1._readableStreamController, r2);
            ReadableByteStreamControllerError2(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader2(reader)) {
            ReadableStreamReaderGenericRelease2(reader);
            reader = AcquireReadableStreamDefaultReader2(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask2(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array2(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError2(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError2(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel2(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue2(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue2(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose2(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose2(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond2(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond2(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead2(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader2(reader)) {
            ReadableStreamReaderGenericRelease2(reader);
            reader = AcquireReadableStreamBYOBReader2(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask2(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array2(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError2(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError2(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel2(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView2(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue2(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView2(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose2(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose2(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView2(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond2(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead2(reader, view, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith2(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest2(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith2(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith2(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest2(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith2(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList2([reason1, reason2]);
            const cancelResult = ReadableStreamCancel2(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList2([reason1, reason2]);
            const cancelResult = ReadableStreamCancel2(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream2(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream2(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function convertUnderlyingDefaultOrByteSource2(source, context) {
        assertDictionary2(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange2(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback2(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback2(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback2(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType2(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback2(fn, original, context) {
        assertFunction2(fn, context);
        return (reason) => promiseCall2(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback2(fn, original, context) {
        assertFunction2(fn, context);
        return (controller) => promiseCall2(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback2(fn, original, context) {
        assertFunction2(fn, context);
        return (controller) => reflectCall2(fn, original, [controller]);
      }
      function convertReadableStreamType2(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertReaderOptions2(options, context) {
        assertDictionary2(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode2(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode2(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertIteratorOptions2(options, context) {
        assertDictionary2(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions2(options, context) {
        assertDictionary2(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== void 0) {
          assertAbortSignal2(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal2(signal, context) {
        if (!isAbortSignal3(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair2(pair, context) {
        assertDictionary2(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField2(readable, "readable", "ReadableWritablePair");
        assertReadableStream2(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField2(writable, "writable", "ReadableWritablePair");
        assertWritableStream2(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream3 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject2(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy2(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource2(rawUnderlyingSource, "First parameter");
          InitializeReadableStream2(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark2(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource2(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm2(strategy);
            const highWaterMark = ExtractHighWaterMark2(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource2(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        get locked() {
          if (!IsReadableStream2(this)) {
            throw streamBrandCheckException$12("locked");
          }
          return IsReadableStreamLocked2(this);
        }
        cancel(reason = void 0) {
          if (!IsReadableStream2(this)) {
            return promiseRejectedWith2(streamBrandCheckException$12("cancel"));
          }
          if (IsReadableStreamLocked2(this)) {
            return promiseRejectedWith2(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel2(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream2(this)) {
            throw streamBrandCheckException$12("getReader");
          }
          const options = convertReaderOptions2(rawOptions, "First parameter");
          if (options.mode === void 0) {
            return AcquireReadableStreamDefaultReader2(this);
          }
          return AcquireReadableStreamBYOBReader2(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream2(this)) {
            throw streamBrandCheckException$12("pipeThrough");
          }
          assertRequiredArgument2(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair2(rawTransform, "First parameter");
          const options = convertPipeOptions2(rawOptions, "Second parameter");
          if (IsReadableStreamLocked2(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked2(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo2(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          setPromiseIsHandledToTrue2(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream2(this)) {
            return promiseRejectedWith2(streamBrandCheckException$12("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith2(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream2(destination)) {
            return promiseRejectedWith2(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options;
          try {
            options = convertPipeOptions2(rawOptions, "Second parameter");
          } catch (e2) {
            return promiseRejectedWith2(e2);
          }
          if (IsReadableStreamLocked2(this)) {
            return promiseRejectedWith2(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked2(destination)) {
            return promiseRejectedWith2(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo2(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        tee() {
          if (!IsReadableStream2(this)) {
            throw streamBrandCheckException$12("tee");
          }
          const branches = ReadableStreamTee2(this);
          return CreateArrayFromList2(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream2(this)) {
            throw streamBrandCheckException$12("values");
          }
          const options = convertIteratorOptions2(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator2(this, options.preventCancel);
        }
      }
      Object.defineProperties(ReadableStream3.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream3.prototype, SymbolPolyfill2.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      if (typeof SymbolPolyfill2.asyncIterator === "symbol") {
        Object.defineProperty(ReadableStream3.prototype, SymbolPolyfill2.asyncIterator, {
          value: ReadableStream3.prototype.values,
          writable: true,
          configurable: true
        });
      }
      function CreateReadableStream2(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream3.prototype);
        InitializeReadableStream2(stream);
        const controller = Object.create(ReadableStreamDefaultController2.prototype);
        SetUpReadableStreamDefaultController2(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream2(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream3.prototype);
        InitializeReadableStream2(stream);
        const controller = Object.create(ReadableByteStreamController2.prototype);
        SetUpReadableByteStreamController2(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream2(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStream3;
      }
      function IsReadableStreamLocked2(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel2(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith2(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith2(stream._storedError);
        }
        ReadableStreamClose2(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader2(reader)) {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
          reader._readIntoRequests = new SimpleQueue2();
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps2](reason);
        return transformPromiseWith2(sourceCancelPromise, noop3);
      }
      function ReadableStreamClose2(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve2(reader);
        if (IsReadableStreamDefaultReader2(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
          reader._readRequests = new SimpleQueue2();
        }
      }
      function ReadableStreamError2(stream, e2) {
        stream._state = "errored";
        stream._storedError = e2;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject2(reader, e2);
        if (IsReadableStreamDefaultReader2(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._errorSteps(e2);
          });
          reader._readRequests = new SimpleQueue2();
        } else {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._errorSteps(e2);
          });
          reader._readIntoRequests = new SimpleQueue2();
        }
      }
      function streamBrandCheckException$12(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit2(init, context) {
        assertDictionary2(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField2(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble2(highWaterMark)
        };
      }
      const byteLengthSizeFunction2 = (chunk) => {
        return chunk.byteLength;
      };
      try {
        Object.defineProperty(byteLengthSizeFunction2, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a) {
      }
      class ByteLengthQueuingStrategy2 {
        constructor(options) {
          assertRequiredArgument2(options, 1, "ByteLengthQueuingStrategy");
          options = convertQueuingStrategyInit2(options, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy2(this)) {
            throw byteLengthBrandCheckException2("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsByteLengthQueuingStrategy2(this)) {
            throw byteLengthBrandCheckException2("size");
          }
          return byteLengthSizeFunction2;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy2.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy2.prototype, SymbolPolyfill2.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException2(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof ByteLengthQueuingStrategy2;
      }
      const countSizeFunction2 = () => {
        return 1;
      };
      try {
        Object.defineProperty(countSizeFunction2, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a) {
      }
      class CountQueuingStrategy2 {
        constructor(options) {
          assertRequiredArgument2(options, 1, "CountQueuingStrategy");
          options = convertQueuingStrategyInit2(options, "First parameter");
          this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsCountQueuingStrategy2(this)) {
            throw countBrandCheckException2("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsCountQueuingStrategy2(this)) {
            throw countBrandCheckException2("size");
          }
          return countSizeFunction2;
        }
      }
      Object.defineProperties(CountQueuingStrategy2.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy2.prototype, SymbolPolyfill2.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException2(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof CountQueuingStrategy2;
      }
      function convertTransformer2(original, context) {
        assertDictionary2(original, context);
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback2(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback2(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback2(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback2(fn, original, context) {
        assertFunction2(fn, context);
        return (controller) => promiseCall2(fn, original, [controller]);
      }
      function convertTransformerStartCallback2(fn, original, context) {
        assertFunction2(fn, context);
        return (controller) => reflectCall2(fn, original, [controller]);
      }
      function convertTransformerTransformCallback2(fn, original, context) {
        assertFunction2(fn, context);
        return (chunk, controller) => promiseCall2(fn, original, [chunk, controller]);
      }
      class TransformStream2 {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy2(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy2(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer2(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark2(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm2(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark2(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm2(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise2((resolve) => {
            startPromise_resolve = resolve;
          });
          InitializeTransformStream2(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer2(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        get readable() {
          if (!IsTransformStream2(this)) {
            throw streamBrandCheckException2("readable");
          }
          return this._readable;
        }
        get writable() {
          if (!IsTransformStream2(this)) {
            throw streamBrandCheckException2("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream2.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(TransformStream2.prototype, SymbolPolyfill2.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream2(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm2(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm2(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm2(stream);
        }
        stream._writable = CreateWritableStream2(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm2(stream);
        }
        function cancelAlgorithm(reason) {
          TransformStreamErrorWritableAndUnblockWrite2(stream, reason);
          return promiseResolvedWith2(void 0);
        }
        stream._readable = CreateReadableStream2(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure2(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
          return false;
        }
        return x2 instanceof TransformStream2;
      }
      function TransformStreamError2(stream, e2) {
        ReadableStreamDefaultControllerError2(stream._readable._readableStreamController, e2);
        TransformStreamErrorWritableAndUnblockWrite2(stream, e2);
      }
      function TransformStreamErrorWritableAndUnblockWrite2(stream, e2) {
        TransformStreamDefaultControllerClearAlgorithms2(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded2(stream._writable._writableStreamController, e2);
        if (stream._backpressure) {
          TransformStreamSetBackpressure2(stream, false);
        }
      }
      function TransformStreamSetBackpressure2(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise2((resolve) => {
          stream._backpressureChangePromise_resolve = resolve;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController2 {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsTransformStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException2("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize2(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException2("enqueue");
          }
          TransformStreamDefaultControllerEnqueue2(this, chunk);
        }
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException2("error");
          }
          TransformStreamDefaultControllerError2(this, reason);
        }
        terminate() {
          if (!IsTransformStreamDefaultController2(this)) {
            throw defaultControllerBrandCheckException2("terminate");
          }
          TransformStreamDefaultControllerTerminate2(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController2.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill2.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController2.prototype, SymbolPolyfill2.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController2(x2) {
        if (!typeIsObject2(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
          return false;
        }
        return x2 instanceof TransformStreamDefaultController2;
      }
      function SetUpTransformStreamDefaultController2(stream, controller, transformAlgorithm, flushAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer2(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController2.prototype);
        let transformAlgorithm = (chunk) => {
          try {
            TransformStreamDefaultControllerEnqueue2(controller, chunk);
            return promiseResolvedWith2(void 0);
          } catch (transformResultE) {
            return promiseRejectedWith2(transformResultE);
          }
        };
        let flushAlgorithm = () => promiseResolvedWith2(void 0);
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        }
        SetUpTransformStreamDefaultController2(stream, controller, transformAlgorithm, flushAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms2(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue2(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue2(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue2(readableController, chunk);
        } catch (e2) {
          TransformStreamErrorWritableAndUnblockWrite2(stream, e2);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure2(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure2(stream, true);
        }
      }
      function TransformStreamDefaultControllerError2(controller, e2) {
        TransformStreamError2(controller._controlledTransformStream, e2);
      }
      function TransformStreamDefaultControllerPerformTransform2(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith2(transformPromise, void 0, (r2) => {
          TransformStreamError2(controller._controlledTransformStream, r2);
          throw r2;
        });
      }
      function TransformStreamDefaultControllerTerminate2(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose2(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite2(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm2(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith2(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state = writable._state;
            if (state === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform2(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform2(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm2(stream, reason) {
        TransformStreamError2(stream, reason);
        return promiseResolvedWith2(void 0);
      }
      function TransformStreamDefaultSinkCloseAlgorithm2(stream) {
        const readable = stream._readable;
        const controller = stream._transformStreamController;
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms2(controller);
        return transformPromiseWith2(flushPromise, () => {
          if (readable._state === "errored") {
            throw readable._storedError;
          }
          ReadableStreamDefaultControllerClose2(readable._readableStreamController);
        }, (r2) => {
          TransformStreamError2(stream, r2);
          throw readable._storedError;
        });
      }
      function TransformStreamDefaultSourcePullAlgorithm2(stream) {
        TransformStreamSetBackpressure2(stream, false);
        return stream._backpressureChangePromise;
      }
      function defaultControllerBrandCheckException2(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
      }
      function streamBrandCheckException2(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
      }
      exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy2;
      exports2.CountQueuingStrategy = CountQueuingStrategy2;
      exports2.ReadableByteStreamController = ReadableByteStreamController2;
      exports2.ReadableStream = ReadableStream3;
      exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader2;
      exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest2;
      exports2.ReadableStreamDefaultController = ReadableStreamDefaultController2;
      exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader2;
      exports2.TransformStream = TransformStream2;
      exports2.TransformStreamDefaultController = TransformStreamDefaultController2;
      exports2.WritableStream = WritableStream2;
      exports2.WritableStreamDefaultController = WritableStreamDefaultController2;
      exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter2;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/fetch-blob-npm-3.2.0-28e01becfc-f19bc28a2a.zip/node_modules/fetch-blob/streams.cjs
var require_streams = __commonJS({
  "pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/fetch-blob-npm-3.2.0-28e01becfc-f19bc28a2a.zip/node_modules/fetch-blob/streams.cjs"() {
    var POOL_SIZE2 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = __require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, __require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error) {
          process2.emitWarning = emitWarning;
          throw error;
        }
      } catch (error) {
        Object.assign(globalThis, require_ponyfill_es2018());
      }
    }
    try {
      const { Blob: Blob3 } = __require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE2));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error) {
    }
  }
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/fetch-blob-npm-3.2.0-28e01becfc-f19bc28a2a.zip/node_modules/fetch-blob/index.js
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = part;
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var import_streams, POOL_SIZE, _Blob, Blob2, fetch_blob_default;
var init_fetch_blob = __esm({
  "pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/fetch-blob-npm-3.2.0-28e01becfc-f19bc28a2a.zip/node_modules/fetch-blob/index.js"() {
    import_streams = __toESM(require_streams());
    POOL_SIZE = 65536;
    _Blob = class Blob {
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder.encode(`${element}`);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    fetch_blob_default = Blob2;
  }
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/fetch-blob-npm-3.2.0-28e01becfc-f19bc28a2a.zip/node_modules/fetch-blob/file.js
var _File, File2, file_default;
var init_file = __esm({
  "pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/fetch-blob-npm-3.2.0-28e01becfc-f19bc28a2a.zip/node_modules/fetch-blob/file.js"() {
    init_fetch_blob();
    _File = class File extends fetch_blob_default {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof fetch_blob_default && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File2 = _File;
    file_default = File2;
  }
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/formdata-polyfill-npm-4.0.10-e03013c013-82a34df292.zip/node_modules/formdata-polyfill/esm.min.js
function formDataToBlob(F2, B = fetch_blob_default) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
var t, i, h, r, m, f, e, x, FormData;
var init_esm_min = __esm({
  "pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/formdata-polyfill-npm-4.0.10-e03013c013-82a34df292.zip/node_modules/formdata-polyfill/esm.min.js"() {
    init_fetch_blob();
    init_file();
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new file_default([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
  }
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-domexception-npm-1.0.0-e1e813b76f-ee1d37dd2a.zip/node_modules/node-domexception/index.js
var require_node_domexception = __commonJS({
  "pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-domexception-npm-1.0.0-e1e813b76f-ee1d37dd2a.zip/node_modules/node-domexception/index.js"(exports, module) {
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = __require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    module.exports = globalThis.DOMException;
  }
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/fetch-blob-npm-3.2.0-28e01becfc-f19bc28a2a.zip/node_modules/fetch-blob/from.js
import { statSync, createReadStream, promises as fs } from "fs";
import { basename } from "path";
var import_node_domexception, stat, BlobDataItem;
var init_from = __esm({
  "pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/fetch-blob-npm-3.2.0-28e01becfc-f19bc28a2a.zip/node_modules/fetch-blob/from.js"() {
    import_node_domexception = __toESM(require_node_domexception());
    init_file();
    init_fetch_blob();
    ({ stat } = fs);
    BlobDataItem = class {
      #path;
      #start;
      constructor(options) {
        this.#path = options.path;
        this.#start = options.start;
        this.size = options.size;
        this.lastModified = options.lastModified;
      }
      slice(start, end) {
        return new BlobDataItem({
          path: this.#path,
          lastModified: this.lastModified,
          size: end - start,
          start: this.#start + start
        });
      }
      async *stream() {
        const { mtimeMs } = await stat(this.#path);
        if (mtimeMs > this.lastModified) {
          throw new import_node_domexception.default("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
        }
        yield* createReadStream(this.#path, {
          start: this.#start,
          end: this.#start + this.size - 1
        });
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
    };
  }
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f2, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from();
    init_esm_min();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f2 = 1;
    F = {
      PART_BOUNDARY: f2,
      LAST_BOUNDARY: f2 *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/web-streams-polyfill-npm-3.2.1-835bd3857e-b119c78574.zip/node_modules/web-streams-polyfill/dist/ponyfill.es6.mjs
var ponyfill_es6_exports = {};
__export(ponyfill_es6_exports, {
  ByteLengthQueuingStrategy: () => ByteLengthQueuingStrategy,
  CountQueuingStrategy: () => CountQueuingStrategy,
  ReadableByteStreamController: () => ReadableByteStreamController,
  ReadableStream: () => ReadableStream2,
  ReadableStreamBYOBReader: () => ReadableStreamBYOBReader,
  ReadableStreamBYOBRequest: () => ReadableStreamBYOBRequest,
  ReadableStreamDefaultController: () => ReadableStreamDefaultController,
  ReadableStreamDefaultReader: () => ReadableStreamDefaultReader,
  TransformStream: () => TransformStream,
  TransformStreamDefaultController: () => TransformStreamDefaultController,
  WritableStream: () => WritableStream,
  WritableStreamDefaultController: () => WritableStreamDefaultController,
  WritableStreamDefaultWriter: () => WritableStreamDefaultWriter
});
function noop2() {
  return void 0;
}
function getGlobals() {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else if (typeof global !== "undefined") {
    return global;
  }
  return void 0;
}
function typeIsObject(x2) {
  return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
}
function newPromise(executor) {
  return new originalPromise(executor);
}
function promiseResolvedWith(value) {
  return originalPromiseResolve(value);
}
function promiseRejectedWith(reason) {
  return originalPromiseReject(reason);
}
function PerformPromiseThen(promise, onFulfilled, onRejected) {
  return originalPromiseThen.call(promise, onFulfilled, onRejected);
}
function uponPromise(promise, onFulfilled, onRejected) {
  PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
}
function uponFulfillment(promise, onFulfilled) {
  uponPromise(promise, onFulfilled);
}
function uponRejection(promise, onRejected) {
  uponPromise(promise, void 0, onRejected);
}
function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
  return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
}
function setPromiseIsHandledToTrue(promise) {
  PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
}
function reflectCall(F2, V, args) {
  if (typeof F2 !== "function") {
    throw new TypeError("Argument is not a function");
  }
  return Function.prototype.apply.call(F2, V, args);
}
function promiseCall(F2, V, args) {
  try {
    return promiseResolvedWith(reflectCall(F2, V, args));
  } catch (value) {
    return promiseRejectedWith(value);
  }
}
function ReadableStreamReaderGenericInitialize(reader, stream) {
  reader._ownerReadableStream = stream;
  stream._reader = reader;
  if (stream._state === "readable") {
    defaultReaderClosedPromiseInitialize(reader);
  } else if (stream._state === "closed") {
    defaultReaderClosedPromiseInitializeAsResolved(reader);
  } else {
    defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
  }
}
function ReadableStreamReaderGenericCancel(reader, reason) {
  const stream = reader._ownerReadableStream;
  return ReadableStreamCancel(stream, reason);
}
function ReadableStreamReaderGenericRelease(reader) {
  if (reader._ownerReadableStream._state === "readable") {
    defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
  } else {
    defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
  }
  reader._ownerReadableStream._reader = void 0;
  reader._ownerReadableStream = void 0;
}
function readerLockException(name) {
  return new TypeError("Cannot " + name + " a stream using a released reader");
}
function defaultReaderClosedPromiseInitialize(reader) {
  reader._closedPromise = newPromise((resolve, reject) => {
    reader._closedPromise_resolve = resolve;
    reader._closedPromise_reject = reject;
  });
}
function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
  defaultReaderClosedPromiseInitialize(reader);
  defaultReaderClosedPromiseReject(reader, reason);
}
function defaultReaderClosedPromiseInitializeAsResolved(reader) {
  defaultReaderClosedPromiseInitialize(reader);
  defaultReaderClosedPromiseResolve(reader);
}
function defaultReaderClosedPromiseReject(reader, reason) {
  if (reader._closedPromise_reject === void 0) {
    return;
  }
  setPromiseIsHandledToTrue(reader._closedPromise);
  reader._closedPromise_reject(reason);
  reader._closedPromise_resolve = void 0;
  reader._closedPromise_reject = void 0;
}
function defaultReaderClosedPromiseResetToRejected(reader, reason) {
  defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
}
function defaultReaderClosedPromiseResolve(reader) {
  if (reader._closedPromise_resolve === void 0) {
    return;
  }
  reader._closedPromise_resolve(void 0);
  reader._closedPromise_resolve = void 0;
  reader._closedPromise_reject = void 0;
}
function isDictionary(x2) {
  return typeof x2 === "object" || typeof x2 === "function";
}
function assertDictionary(obj, context) {
  if (obj !== void 0 && !isDictionary(obj)) {
    throw new TypeError(`${context} is not an object.`);
  }
}
function assertFunction(x2, context) {
  if (typeof x2 !== "function") {
    throw new TypeError(`${context} is not a function.`);
  }
}
function isObject3(x2) {
  return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
}
function assertObject(x2, context) {
  if (!isObject3(x2)) {
    throw new TypeError(`${context} is not an object.`);
  }
}
function assertRequiredArgument(x2, position, context) {
  if (x2 === void 0) {
    throw new TypeError(`Parameter ${position} is required in '${context}'.`);
  }
}
function assertRequiredField(x2, field, context) {
  if (x2 === void 0) {
    throw new TypeError(`${field} is required in '${context}'.`);
  }
}
function convertUnrestrictedDouble(value) {
  return Number(value);
}
function censorNegativeZero(x2) {
  return x2 === 0 ? 0 : x2;
}
function integerPart(x2) {
  return censorNegativeZero(MathTrunc(x2));
}
function convertUnsignedLongLongWithEnforceRange(value, context) {
  const lowerBound = 0;
  const upperBound = Number.MAX_SAFE_INTEGER;
  let x2 = Number(value);
  x2 = censorNegativeZero(x2);
  if (!NumberIsFinite(x2)) {
    throw new TypeError(`${context} is not a finite number`);
  }
  x2 = integerPart(x2);
  if (x2 < lowerBound || x2 > upperBound) {
    throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
  }
  if (!NumberIsFinite(x2) || x2 === 0) {
    return 0;
  }
  return x2;
}
function assertReadableStream(x2, context) {
  if (!IsReadableStream(x2)) {
    throw new TypeError(`${context} is not a ReadableStream.`);
  }
}
function AcquireReadableStreamDefaultReader(stream) {
  return new ReadableStreamDefaultReader(stream);
}
function ReadableStreamAddReadRequest(stream, readRequest) {
  stream._reader._readRequests.push(readRequest);
}
function ReadableStreamFulfillReadRequest(stream, chunk, done) {
  const reader = stream._reader;
  const readRequest = reader._readRequests.shift();
  if (done) {
    readRequest._closeSteps();
  } else {
    readRequest._chunkSteps(chunk);
  }
}
function ReadableStreamGetNumReadRequests(stream) {
  return stream._reader._readRequests.length;
}
function ReadableStreamHasDefaultReader(stream) {
  const reader = stream._reader;
  if (reader === void 0) {
    return false;
  }
  if (!IsReadableStreamDefaultReader(reader)) {
    return false;
  }
  return true;
}
function IsReadableStreamDefaultReader(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
    return false;
  }
  return x2 instanceof ReadableStreamDefaultReader;
}
function ReadableStreamDefaultReaderRead(reader, readRequest) {
  const stream = reader._ownerReadableStream;
  stream._disturbed = true;
  if (stream._state === "closed") {
    readRequest._closeSteps();
  } else if (stream._state === "errored") {
    readRequest._errorSteps(stream._storedError);
  } else {
    stream._readableStreamController[PullSteps](readRequest);
  }
}
function defaultReaderBrandCheckException(name) {
  return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
}
function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
  const reader = AcquireReadableStreamDefaultReader(stream);
  const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
  const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
  iterator._asyncIteratorImpl = impl;
  return iterator;
}
function IsReadableStreamAsyncIterator(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
    return false;
  }
  try {
    return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
  } catch (_a) {
    return false;
  }
}
function streamAsyncIteratorBrandCheckException(name) {
  return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
}
function CreateArrayFromList(elements) {
  return elements.slice();
}
function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
  new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
}
function TransferArrayBuffer(O) {
  return O;
}
function IsDetachedBuffer(O) {
  return false;
}
function ArrayBufferSlice(buffer, begin, end) {
  if (buffer.slice) {
    return buffer.slice(begin, end);
  }
  const length = end - begin;
  const slice = new ArrayBuffer(length);
  CopyDataBlockBytes(slice, 0, buffer, begin, length);
  return slice;
}
function IsNonNegativeNumber(v) {
  if (typeof v !== "number") {
    return false;
  }
  if (NumberIsNaN(v)) {
    return false;
  }
  if (v < 0) {
    return false;
  }
  return true;
}
function CloneAsUint8Array(O) {
  const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
  return new Uint8Array(buffer);
}
function DequeueValue(container) {
  const pair = container._queue.shift();
  container._queueTotalSize -= pair.size;
  if (container._queueTotalSize < 0) {
    container._queueTotalSize = 0;
  }
  return pair.value;
}
function EnqueueValueWithSize(container, value, size) {
  if (!IsNonNegativeNumber(size) || size === Infinity) {
    throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
  }
  container._queue.push({ value, size });
  container._queueTotalSize += size;
}
function PeekQueueValue(container) {
  const pair = container._queue.peek();
  return pair.value;
}
function ResetQueue(container) {
  container._queue = new SimpleQueue();
  container._queueTotalSize = 0;
}
function IsReadableByteStreamController(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
    return false;
  }
  return x2 instanceof ReadableByteStreamController;
}
function IsReadableStreamBYOBRequest(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
    return false;
  }
  return x2 instanceof ReadableStreamBYOBRequest;
}
function ReadableByteStreamControllerCallPullIfNeeded(controller) {
  const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
  if (!shouldPull) {
    return;
  }
  if (controller._pulling) {
    controller._pullAgain = true;
    return;
  }
  controller._pulling = true;
  const pullPromise = controller._pullAlgorithm();
  uponPromise(pullPromise, () => {
    controller._pulling = false;
    if (controller._pullAgain) {
      controller._pullAgain = false;
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
  }, (e2) => {
    ReadableByteStreamControllerError(controller, e2);
  });
}
function ReadableByteStreamControllerClearPendingPullIntos(controller) {
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  controller._pendingPullIntos = new SimpleQueue();
}
function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
  let done = false;
  if (stream._state === "closed") {
    done = true;
  }
  const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
  if (pullIntoDescriptor.readerType === "default") {
    ReadableStreamFulfillReadRequest(stream, filledView, done);
  } else {
    ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
  }
}
function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
  const bytesFilled = pullIntoDescriptor.bytesFilled;
  const elementSize = pullIntoDescriptor.elementSize;
  return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
}
function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
  controller._queue.push({ buffer, byteOffset, byteLength });
  controller._queueTotalSize += byteLength;
}
function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
  const elementSize = pullIntoDescriptor.elementSize;
  const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
  const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
  const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
  const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
  let totalBytesToCopyRemaining = maxBytesToCopy;
  let ready = false;
  if (maxAlignedBytes > currentAlignedBytes) {
    totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
    ready = true;
  }
  const queue = controller._queue;
  while (totalBytesToCopyRemaining > 0) {
    const headOfQueue = queue.peek();
    const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
    const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
    CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
    if (headOfQueue.byteLength === bytesToCopy) {
      queue.shift();
    } else {
      headOfQueue.byteOffset += bytesToCopy;
      headOfQueue.byteLength -= bytesToCopy;
    }
    controller._queueTotalSize -= bytesToCopy;
    ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
    totalBytesToCopyRemaining -= bytesToCopy;
  }
  return ready;
}
function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
  pullIntoDescriptor.bytesFilled += size;
}
function ReadableByteStreamControllerHandleQueueDrain(controller) {
  if (controller._queueTotalSize === 0 && controller._closeRequested) {
    ReadableByteStreamControllerClearAlgorithms(controller);
    ReadableStreamClose(controller._controlledReadableByteStream);
  } else {
    ReadableByteStreamControllerCallPullIfNeeded(controller);
  }
}
function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
  if (controller._byobRequest === null) {
    return;
  }
  controller._byobRequest._associatedReadableByteStreamController = void 0;
  controller._byobRequest._view = null;
  controller._byobRequest = null;
}
function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
  while (controller._pendingPullIntos.length > 0) {
    if (controller._queueTotalSize === 0) {
      return;
    }
    const pullIntoDescriptor = controller._pendingPullIntos.peek();
    if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
      ReadableByteStreamControllerShiftPendingPullInto(controller);
      ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
    }
  }
}
function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
  const stream = controller._controlledReadableByteStream;
  let elementSize = 1;
  if (view.constructor !== DataView) {
    elementSize = view.constructor.BYTES_PER_ELEMENT;
  }
  const ctor = view.constructor;
  const buffer = TransferArrayBuffer(view.buffer);
  const pullIntoDescriptor = {
    buffer,
    bufferByteLength: buffer.byteLength,
    byteOffset: view.byteOffset,
    byteLength: view.byteLength,
    bytesFilled: 0,
    elementSize,
    viewConstructor: ctor,
    readerType: "byob"
  };
  if (controller._pendingPullIntos.length > 0) {
    controller._pendingPullIntos.push(pullIntoDescriptor);
    ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
    return;
  }
  if (stream._state === "closed") {
    const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
    readIntoRequest._closeSteps(emptyView);
    return;
  }
  if (controller._queueTotalSize > 0) {
    if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
      const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
      ReadableByteStreamControllerHandleQueueDrain(controller);
      readIntoRequest._chunkSteps(filledView);
      return;
    }
    if (controller._closeRequested) {
      const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
      ReadableByteStreamControllerError(controller, e2);
      readIntoRequest._errorSteps(e2);
      return;
    }
  }
  controller._pendingPullIntos.push(pullIntoDescriptor);
  ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
  ReadableByteStreamControllerCallPullIfNeeded(controller);
}
function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
  const stream = controller._controlledReadableByteStream;
  if (ReadableStreamHasBYOBReader(stream)) {
    while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
      const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
      ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
    }
  }
}
function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
  ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
  if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
    return;
  }
  ReadableByteStreamControllerShiftPendingPullInto(controller);
  const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
  if (remainderSize > 0) {
    const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
    const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
    ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
  }
  pullIntoDescriptor.bytesFilled -= remainderSize;
  ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
  ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
}
function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
  const firstDescriptor = controller._pendingPullIntos.peek();
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  const state = controller._controlledReadableByteStream._state;
  if (state === "closed") {
    ReadableByteStreamControllerRespondInClosedState(controller);
  } else {
    ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
  }
  ReadableByteStreamControllerCallPullIfNeeded(controller);
}
function ReadableByteStreamControllerShiftPendingPullInto(controller) {
  const descriptor = controller._pendingPullIntos.shift();
  return descriptor;
}
function ReadableByteStreamControllerShouldCallPull(controller) {
  const stream = controller._controlledReadableByteStream;
  if (stream._state !== "readable") {
    return false;
  }
  if (controller._closeRequested) {
    return false;
  }
  if (!controller._started) {
    return false;
  }
  if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
    return true;
  }
  if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
    return true;
  }
  const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
  if (desiredSize > 0) {
    return true;
  }
  return false;
}
function ReadableByteStreamControllerClearAlgorithms(controller) {
  controller._pullAlgorithm = void 0;
  controller._cancelAlgorithm = void 0;
}
function ReadableByteStreamControllerClose(controller) {
  const stream = controller._controlledReadableByteStream;
  if (controller._closeRequested || stream._state !== "readable") {
    return;
  }
  if (controller._queueTotalSize > 0) {
    controller._closeRequested = true;
    return;
  }
  if (controller._pendingPullIntos.length > 0) {
    const firstPendingPullInto = controller._pendingPullIntos.peek();
    if (firstPendingPullInto.bytesFilled > 0) {
      const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
      ReadableByteStreamControllerError(controller, e2);
      throw e2;
    }
  }
  ReadableByteStreamControllerClearAlgorithms(controller);
  ReadableStreamClose(stream);
}
function ReadableByteStreamControllerEnqueue(controller, chunk) {
  const stream = controller._controlledReadableByteStream;
  if (controller._closeRequested || stream._state !== "readable") {
    return;
  }
  const buffer = chunk.buffer;
  const byteOffset = chunk.byteOffset;
  const byteLength = chunk.byteLength;
  const transferredBuffer = TransferArrayBuffer(buffer);
  if (controller._pendingPullIntos.length > 0) {
    const firstPendingPullInto = controller._pendingPullIntos.peek();
    if (IsDetachedBuffer(firstPendingPullInto.buffer))
      ;
    firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
  }
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  if (ReadableStreamHasDefaultReader(stream)) {
    if (ReadableStreamGetNumReadRequests(stream) === 0) {
      ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
    } else {
      if (controller._pendingPullIntos.length > 0) {
        ReadableByteStreamControllerShiftPendingPullInto(controller);
      }
      const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
      ReadableStreamFulfillReadRequest(stream, transferredView, false);
    }
  } else if (ReadableStreamHasBYOBReader(stream)) {
    ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
    ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
  } else {
    ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
  }
  ReadableByteStreamControllerCallPullIfNeeded(controller);
}
function ReadableByteStreamControllerError(controller, e2) {
  const stream = controller._controlledReadableByteStream;
  if (stream._state !== "readable") {
    return;
  }
  ReadableByteStreamControllerClearPendingPullIntos(controller);
  ResetQueue(controller);
  ReadableByteStreamControllerClearAlgorithms(controller);
  ReadableStreamError(stream, e2);
}
function ReadableByteStreamControllerGetBYOBRequest(controller) {
  if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
    const firstDescriptor = controller._pendingPullIntos.peek();
    const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
    const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
    SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
    controller._byobRequest = byobRequest;
  }
  return controller._byobRequest;
}
function ReadableByteStreamControllerGetDesiredSize(controller) {
  const state = controller._controlledReadableByteStream._state;
  if (state === "errored") {
    return null;
  }
  if (state === "closed") {
    return 0;
  }
  return controller._strategyHWM - controller._queueTotalSize;
}
function ReadableByteStreamControllerRespond(controller, bytesWritten) {
  const firstDescriptor = controller._pendingPullIntos.peek();
  const state = controller._controlledReadableByteStream._state;
  if (state === "closed") {
    if (bytesWritten !== 0) {
      throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
    }
  } else {
    if (bytesWritten === 0) {
      throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
    }
    if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
      throw new RangeError("bytesWritten out of range");
    }
  }
  firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
  ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
}
function ReadableByteStreamControllerRespondWithNewView(controller, view) {
  const firstDescriptor = controller._pendingPullIntos.peek();
  const state = controller._controlledReadableByteStream._state;
  if (state === "closed") {
    if (view.byteLength !== 0) {
      throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
    }
  } else {
    if (view.byteLength === 0) {
      throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
    }
  }
  if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
    throw new RangeError("The region specified by view does not match byobRequest");
  }
  if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
    throw new RangeError("The buffer of view has different capacity than byobRequest");
  }
  if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
    throw new RangeError("The region specified by view is larger than byobRequest");
  }
  const viewByteLength = view.byteLength;
  firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
  ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
}
function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
  controller._controlledReadableByteStream = stream;
  controller._pullAgain = false;
  controller._pulling = false;
  controller._byobRequest = null;
  controller._queue = controller._queueTotalSize = void 0;
  ResetQueue(controller);
  controller._closeRequested = false;
  controller._started = false;
  controller._strategyHWM = highWaterMark;
  controller._pullAlgorithm = pullAlgorithm;
  controller._cancelAlgorithm = cancelAlgorithm;
  controller._autoAllocateChunkSize = autoAllocateChunkSize;
  controller._pendingPullIntos = new SimpleQueue();
  stream._readableStreamController = controller;
  const startResult = startAlgorithm();
  uponPromise(promiseResolvedWith(startResult), () => {
    controller._started = true;
    ReadableByteStreamControllerCallPullIfNeeded(controller);
  }, (r2) => {
    ReadableByteStreamControllerError(controller, r2);
  });
}
function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
  const controller = Object.create(ReadableByteStreamController.prototype);
  let startAlgorithm = () => void 0;
  let pullAlgorithm = () => promiseResolvedWith(void 0);
  let cancelAlgorithm = () => promiseResolvedWith(void 0);
  if (underlyingByteSource.start !== void 0) {
    startAlgorithm = () => underlyingByteSource.start(controller);
  }
  if (underlyingByteSource.pull !== void 0) {
    pullAlgorithm = () => underlyingByteSource.pull(controller);
  }
  if (underlyingByteSource.cancel !== void 0) {
    cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
  }
  const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
  if (autoAllocateChunkSize === 0) {
    throw new TypeError("autoAllocateChunkSize must be greater than 0");
  }
  SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
}
function SetUpReadableStreamBYOBRequest(request, controller, view) {
  request._associatedReadableByteStreamController = controller;
  request._view = view;
}
function byobRequestBrandCheckException(name) {
  return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
}
function byteStreamControllerBrandCheckException(name) {
  return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
}
function AcquireReadableStreamBYOBReader(stream) {
  return new ReadableStreamBYOBReader(stream);
}
function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
  stream._reader._readIntoRequests.push(readIntoRequest);
}
function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
  const reader = stream._reader;
  const readIntoRequest = reader._readIntoRequests.shift();
  if (done) {
    readIntoRequest._closeSteps(chunk);
  } else {
    readIntoRequest._chunkSteps(chunk);
  }
}
function ReadableStreamGetNumReadIntoRequests(stream) {
  return stream._reader._readIntoRequests.length;
}
function ReadableStreamHasBYOBReader(stream) {
  const reader = stream._reader;
  if (reader === void 0) {
    return false;
  }
  if (!IsReadableStreamBYOBReader(reader)) {
    return false;
  }
  return true;
}
function IsReadableStreamBYOBReader(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
    return false;
  }
  return x2 instanceof ReadableStreamBYOBReader;
}
function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
  const stream = reader._ownerReadableStream;
  stream._disturbed = true;
  if (stream._state === "errored") {
    readIntoRequest._errorSteps(stream._storedError);
  } else {
    ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
  }
}
function byobReaderBrandCheckException(name) {
  return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
}
function ExtractHighWaterMark(strategy, defaultHWM) {
  const { highWaterMark } = strategy;
  if (highWaterMark === void 0) {
    return defaultHWM;
  }
  if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
    throw new RangeError("Invalid highWaterMark");
  }
  return highWaterMark;
}
function ExtractSizeAlgorithm(strategy) {
  const { size } = strategy;
  if (!size) {
    return () => 1;
  }
  return size;
}
function convertQueuingStrategy(init, context) {
  assertDictionary(init, context);
  const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
  const size = init === null || init === void 0 ? void 0 : init.size;
  return {
    highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
    size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
  };
}
function convertQueuingStrategySize(fn, context) {
  assertFunction(fn, context);
  return (chunk) => convertUnrestrictedDouble(fn(chunk));
}
function convertUnderlyingSink(original, context) {
  assertDictionary(original, context);
  const abort = original === null || original === void 0 ? void 0 : original.abort;
  const close = original === null || original === void 0 ? void 0 : original.close;
  const start = original === null || original === void 0 ? void 0 : original.start;
  const type = original === null || original === void 0 ? void 0 : original.type;
  const write = original === null || original === void 0 ? void 0 : original.write;
  return {
    abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
    close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
    start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
    write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
    type
  };
}
function convertUnderlyingSinkAbortCallback(fn, original, context) {
  assertFunction(fn, context);
  return (reason) => promiseCall(fn, original, [reason]);
}
function convertUnderlyingSinkCloseCallback(fn, original, context) {
  assertFunction(fn, context);
  return () => promiseCall(fn, original, []);
}
function convertUnderlyingSinkStartCallback(fn, original, context) {
  assertFunction(fn, context);
  return (controller) => reflectCall(fn, original, [controller]);
}
function convertUnderlyingSinkWriteCallback(fn, original, context) {
  assertFunction(fn, context);
  return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
}
function assertWritableStream(x2, context) {
  if (!IsWritableStream(x2)) {
    throw new TypeError(`${context} is not a WritableStream.`);
  }
}
function isAbortSignal2(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  try {
    return typeof value.aborted === "boolean";
  } catch (_a) {
    return false;
  }
}
function createAbortController() {
  if (supportsAbortController2) {
    return new AbortController();
  }
  return void 0;
}
function AcquireWritableStreamDefaultWriter(stream) {
  return new WritableStreamDefaultWriter(stream);
}
function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
  const stream = Object.create(WritableStream.prototype);
  InitializeWritableStream(stream);
  const controller = Object.create(WritableStreamDefaultController.prototype);
  SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
  return stream;
}
function InitializeWritableStream(stream) {
  stream._state = "writable";
  stream._storedError = void 0;
  stream._writer = void 0;
  stream._writableStreamController = void 0;
  stream._writeRequests = new SimpleQueue();
  stream._inFlightWriteRequest = void 0;
  stream._closeRequest = void 0;
  stream._inFlightCloseRequest = void 0;
  stream._pendingAbortRequest = void 0;
  stream._backpressure = false;
}
function IsWritableStream(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
    return false;
  }
  return x2 instanceof WritableStream;
}
function IsWritableStreamLocked(stream) {
  if (stream._writer === void 0) {
    return false;
  }
  return true;
}
function WritableStreamAbort(stream, reason) {
  var _a;
  if (stream._state === "closed" || stream._state === "errored") {
    return promiseResolvedWith(void 0);
  }
  stream._writableStreamController._abortReason = reason;
  (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
  const state = stream._state;
  if (state === "closed" || state === "errored") {
    return promiseResolvedWith(void 0);
  }
  if (stream._pendingAbortRequest !== void 0) {
    return stream._pendingAbortRequest._promise;
  }
  let wasAlreadyErroring = false;
  if (state === "erroring") {
    wasAlreadyErroring = true;
    reason = void 0;
  }
  const promise = newPromise((resolve, reject) => {
    stream._pendingAbortRequest = {
      _promise: void 0,
      _resolve: resolve,
      _reject: reject,
      _reason: reason,
      _wasAlreadyErroring: wasAlreadyErroring
    };
  });
  stream._pendingAbortRequest._promise = promise;
  if (!wasAlreadyErroring) {
    WritableStreamStartErroring(stream, reason);
  }
  return promise;
}
function WritableStreamClose(stream) {
  const state = stream._state;
  if (state === "closed" || state === "errored") {
    return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
  }
  const promise = newPromise((resolve, reject) => {
    const closeRequest = {
      _resolve: resolve,
      _reject: reject
    };
    stream._closeRequest = closeRequest;
  });
  const writer = stream._writer;
  if (writer !== void 0 && stream._backpressure && state === "writable") {
    defaultWriterReadyPromiseResolve(writer);
  }
  WritableStreamDefaultControllerClose(stream._writableStreamController);
  return promise;
}
function WritableStreamAddWriteRequest(stream) {
  const promise = newPromise((resolve, reject) => {
    const writeRequest = {
      _resolve: resolve,
      _reject: reject
    };
    stream._writeRequests.push(writeRequest);
  });
  return promise;
}
function WritableStreamDealWithRejection(stream, error) {
  const state = stream._state;
  if (state === "writable") {
    WritableStreamStartErroring(stream, error);
    return;
  }
  WritableStreamFinishErroring(stream);
}
function WritableStreamStartErroring(stream, reason) {
  const controller = stream._writableStreamController;
  stream._state = "erroring";
  stream._storedError = reason;
  const writer = stream._writer;
  if (writer !== void 0) {
    WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
  }
  if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
    WritableStreamFinishErroring(stream);
  }
}
function WritableStreamFinishErroring(stream) {
  stream._state = "errored";
  stream._writableStreamController[ErrorSteps]();
  const storedError = stream._storedError;
  stream._writeRequests.forEach((writeRequest) => {
    writeRequest._reject(storedError);
  });
  stream._writeRequests = new SimpleQueue();
  if (stream._pendingAbortRequest === void 0) {
    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
    return;
  }
  const abortRequest = stream._pendingAbortRequest;
  stream._pendingAbortRequest = void 0;
  if (abortRequest._wasAlreadyErroring) {
    abortRequest._reject(storedError);
    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
    return;
  }
  const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
  uponPromise(promise, () => {
    abortRequest._resolve();
    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
  }, (reason) => {
    abortRequest._reject(reason);
    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
  });
}
function WritableStreamFinishInFlightWrite(stream) {
  stream._inFlightWriteRequest._resolve(void 0);
  stream._inFlightWriteRequest = void 0;
}
function WritableStreamFinishInFlightWriteWithError(stream, error) {
  stream._inFlightWriteRequest._reject(error);
  stream._inFlightWriteRequest = void 0;
  WritableStreamDealWithRejection(stream, error);
}
function WritableStreamFinishInFlightClose(stream) {
  stream._inFlightCloseRequest._resolve(void 0);
  stream._inFlightCloseRequest = void 0;
  const state = stream._state;
  if (state === "erroring") {
    stream._storedError = void 0;
    if (stream._pendingAbortRequest !== void 0) {
      stream._pendingAbortRequest._resolve();
      stream._pendingAbortRequest = void 0;
    }
  }
  stream._state = "closed";
  const writer = stream._writer;
  if (writer !== void 0) {
    defaultWriterClosedPromiseResolve(writer);
  }
}
function WritableStreamFinishInFlightCloseWithError(stream, error) {
  stream._inFlightCloseRequest._reject(error);
  stream._inFlightCloseRequest = void 0;
  if (stream._pendingAbortRequest !== void 0) {
    stream._pendingAbortRequest._reject(error);
    stream._pendingAbortRequest = void 0;
  }
  WritableStreamDealWithRejection(stream, error);
}
function WritableStreamCloseQueuedOrInFlight(stream) {
  if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
    return false;
  }
  return true;
}
function WritableStreamHasOperationMarkedInFlight(stream) {
  if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
    return false;
  }
  return true;
}
function WritableStreamMarkCloseRequestInFlight(stream) {
  stream._inFlightCloseRequest = stream._closeRequest;
  stream._closeRequest = void 0;
}
function WritableStreamMarkFirstWriteRequestInFlight(stream) {
  stream._inFlightWriteRequest = stream._writeRequests.shift();
}
function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
  if (stream._closeRequest !== void 0) {
    stream._closeRequest._reject(stream._storedError);
    stream._closeRequest = void 0;
  }
  const writer = stream._writer;
  if (writer !== void 0) {
    defaultWriterClosedPromiseReject(writer, stream._storedError);
  }
}
function WritableStreamUpdateBackpressure(stream, backpressure) {
  const writer = stream._writer;
  if (writer !== void 0 && backpressure !== stream._backpressure) {
    if (backpressure) {
      defaultWriterReadyPromiseReset(writer);
    } else {
      defaultWriterReadyPromiseResolve(writer);
    }
  }
  stream._backpressure = backpressure;
}
function IsWritableStreamDefaultWriter(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
    return false;
  }
  return x2 instanceof WritableStreamDefaultWriter;
}
function WritableStreamDefaultWriterAbort(writer, reason) {
  const stream = writer._ownerWritableStream;
  return WritableStreamAbort(stream, reason);
}
function WritableStreamDefaultWriterClose(writer) {
  const stream = writer._ownerWritableStream;
  return WritableStreamClose(stream);
}
function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
  const stream = writer._ownerWritableStream;
  const state = stream._state;
  if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
    return promiseResolvedWith(void 0);
  }
  if (state === "errored") {
    return promiseRejectedWith(stream._storedError);
  }
  return WritableStreamDefaultWriterClose(writer);
}
function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
  if (writer._closedPromiseState === "pending") {
    defaultWriterClosedPromiseReject(writer, error);
  } else {
    defaultWriterClosedPromiseResetToRejected(writer, error);
  }
}
function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
  if (writer._readyPromiseState === "pending") {
    defaultWriterReadyPromiseReject(writer, error);
  } else {
    defaultWriterReadyPromiseResetToRejected(writer, error);
  }
}
function WritableStreamDefaultWriterGetDesiredSize(writer) {
  const stream = writer._ownerWritableStream;
  const state = stream._state;
  if (state === "errored" || state === "erroring") {
    return null;
  }
  if (state === "closed") {
    return 0;
  }
  return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
}
function WritableStreamDefaultWriterRelease(writer) {
  const stream = writer._ownerWritableStream;
  const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
  WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
  WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
  stream._writer = void 0;
  writer._ownerWritableStream = void 0;
}
function WritableStreamDefaultWriterWrite(writer, chunk) {
  const stream = writer._ownerWritableStream;
  const controller = stream._writableStreamController;
  const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
  if (stream !== writer._ownerWritableStream) {
    return promiseRejectedWith(defaultWriterLockException("write to"));
  }
  const state = stream._state;
  if (state === "errored") {
    return promiseRejectedWith(stream._storedError);
  }
  if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
    return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
  }
  if (state === "erroring") {
    return promiseRejectedWith(stream._storedError);
  }
  const promise = WritableStreamAddWriteRequest(stream);
  WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
  return promise;
}
function IsWritableStreamDefaultController(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
    return false;
  }
  return x2 instanceof WritableStreamDefaultController;
}
function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
  controller._controlledWritableStream = stream;
  stream._writableStreamController = controller;
  controller._queue = void 0;
  controller._queueTotalSize = void 0;
  ResetQueue(controller);
  controller._abortReason = void 0;
  controller._abortController = createAbortController();
  controller._started = false;
  controller._strategySizeAlgorithm = sizeAlgorithm;
  controller._strategyHWM = highWaterMark;
  controller._writeAlgorithm = writeAlgorithm;
  controller._closeAlgorithm = closeAlgorithm;
  controller._abortAlgorithm = abortAlgorithm;
  const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
  WritableStreamUpdateBackpressure(stream, backpressure);
  const startResult = startAlgorithm();
  const startPromise = promiseResolvedWith(startResult);
  uponPromise(startPromise, () => {
    controller._started = true;
    WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
  }, (r2) => {
    controller._started = true;
    WritableStreamDealWithRejection(stream, r2);
  });
}
function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
  const controller = Object.create(WritableStreamDefaultController.prototype);
  let startAlgorithm = () => void 0;
  let writeAlgorithm = () => promiseResolvedWith(void 0);
  let closeAlgorithm = () => promiseResolvedWith(void 0);
  let abortAlgorithm = () => promiseResolvedWith(void 0);
  if (underlyingSink.start !== void 0) {
    startAlgorithm = () => underlyingSink.start(controller);
  }
  if (underlyingSink.write !== void 0) {
    writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
  }
  if (underlyingSink.close !== void 0) {
    closeAlgorithm = () => underlyingSink.close();
  }
  if (underlyingSink.abort !== void 0) {
    abortAlgorithm = (reason) => underlyingSink.abort(reason);
  }
  SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
}
function WritableStreamDefaultControllerClearAlgorithms(controller) {
  controller._writeAlgorithm = void 0;
  controller._closeAlgorithm = void 0;
  controller._abortAlgorithm = void 0;
  controller._strategySizeAlgorithm = void 0;
}
function WritableStreamDefaultControllerClose(controller) {
  EnqueueValueWithSize(controller, closeSentinel, 0);
  WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
}
function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
  try {
    return controller._strategySizeAlgorithm(chunk);
  } catch (chunkSizeE) {
    WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
    return 1;
  }
}
function WritableStreamDefaultControllerGetDesiredSize(controller) {
  return controller._strategyHWM - controller._queueTotalSize;
}
function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
  try {
    EnqueueValueWithSize(controller, chunk, chunkSize);
  } catch (enqueueE) {
    WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
    return;
  }
  const stream = controller._controlledWritableStream;
  if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
    const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
    WritableStreamUpdateBackpressure(stream, backpressure);
  }
  WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
}
function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
  const stream = controller._controlledWritableStream;
  if (!controller._started) {
    return;
  }
  if (stream._inFlightWriteRequest !== void 0) {
    return;
  }
  const state = stream._state;
  if (state === "erroring") {
    WritableStreamFinishErroring(stream);
    return;
  }
  if (controller._queue.length === 0) {
    return;
  }
  const value = PeekQueueValue(controller);
  if (value === closeSentinel) {
    WritableStreamDefaultControllerProcessClose(controller);
  } else {
    WritableStreamDefaultControllerProcessWrite(controller, value);
  }
}
function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
  if (controller._controlledWritableStream._state === "writable") {
    WritableStreamDefaultControllerError(controller, error);
  }
}
function WritableStreamDefaultControllerProcessClose(controller) {
  const stream = controller._controlledWritableStream;
  WritableStreamMarkCloseRequestInFlight(stream);
  DequeueValue(controller);
  const sinkClosePromise = controller._closeAlgorithm();
  WritableStreamDefaultControllerClearAlgorithms(controller);
  uponPromise(sinkClosePromise, () => {
    WritableStreamFinishInFlightClose(stream);
  }, (reason) => {
    WritableStreamFinishInFlightCloseWithError(stream, reason);
  });
}
function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
  const stream = controller._controlledWritableStream;
  WritableStreamMarkFirstWriteRequestInFlight(stream);
  const sinkWritePromise = controller._writeAlgorithm(chunk);
  uponPromise(sinkWritePromise, () => {
    WritableStreamFinishInFlightWrite(stream);
    const state = stream._state;
    DequeueValue(controller);
    if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
      const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
      WritableStreamUpdateBackpressure(stream, backpressure);
    }
    WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
  }, (reason) => {
    if (stream._state === "writable") {
      WritableStreamDefaultControllerClearAlgorithms(controller);
    }
    WritableStreamFinishInFlightWriteWithError(stream, reason);
  });
}
function WritableStreamDefaultControllerGetBackpressure(controller) {
  const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
  return desiredSize <= 0;
}
function WritableStreamDefaultControllerError(controller, error) {
  const stream = controller._controlledWritableStream;
  WritableStreamDefaultControllerClearAlgorithms(controller);
  WritableStreamStartErroring(stream, error);
}
function streamBrandCheckException$2(name) {
  return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
}
function defaultControllerBrandCheckException$2(name) {
  return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
}
function defaultWriterBrandCheckException(name) {
  return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
}
function defaultWriterLockException(name) {
  return new TypeError("Cannot " + name + " a stream using a released writer");
}
function defaultWriterClosedPromiseInitialize(writer) {
  writer._closedPromise = newPromise((resolve, reject) => {
    writer._closedPromise_resolve = resolve;
    writer._closedPromise_reject = reject;
    writer._closedPromiseState = "pending";
  });
}
function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
  defaultWriterClosedPromiseInitialize(writer);
  defaultWriterClosedPromiseReject(writer, reason);
}
function defaultWriterClosedPromiseInitializeAsResolved(writer) {
  defaultWriterClosedPromiseInitialize(writer);
  defaultWriterClosedPromiseResolve(writer);
}
function defaultWriterClosedPromiseReject(writer, reason) {
  if (writer._closedPromise_reject === void 0) {
    return;
  }
  setPromiseIsHandledToTrue(writer._closedPromise);
  writer._closedPromise_reject(reason);
  writer._closedPromise_resolve = void 0;
  writer._closedPromise_reject = void 0;
  writer._closedPromiseState = "rejected";
}
function defaultWriterClosedPromiseResetToRejected(writer, reason) {
  defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
}
function defaultWriterClosedPromiseResolve(writer) {
  if (writer._closedPromise_resolve === void 0) {
    return;
  }
  writer._closedPromise_resolve(void 0);
  writer._closedPromise_resolve = void 0;
  writer._closedPromise_reject = void 0;
  writer._closedPromiseState = "resolved";
}
function defaultWriterReadyPromiseInitialize(writer) {
  writer._readyPromise = newPromise((resolve, reject) => {
    writer._readyPromise_resolve = resolve;
    writer._readyPromise_reject = reject;
  });
  writer._readyPromiseState = "pending";
}
function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
  defaultWriterReadyPromiseInitialize(writer);
  defaultWriterReadyPromiseReject(writer, reason);
}
function defaultWriterReadyPromiseInitializeAsResolved(writer) {
  defaultWriterReadyPromiseInitialize(writer);
  defaultWriterReadyPromiseResolve(writer);
}
function defaultWriterReadyPromiseReject(writer, reason) {
  if (writer._readyPromise_reject === void 0) {
    return;
  }
  setPromiseIsHandledToTrue(writer._readyPromise);
  writer._readyPromise_reject(reason);
  writer._readyPromise_resolve = void 0;
  writer._readyPromise_reject = void 0;
  writer._readyPromiseState = "rejected";
}
function defaultWriterReadyPromiseReset(writer) {
  defaultWriterReadyPromiseInitialize(writer);
}
function defaultWriterReadyPromiseResetToRejected(writer, reason) {
  defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
}
function defaultWriterReadyPromiseResolve(writer) {
  if (writer._readyPromise_resolve === void 0) {
    return;
  }
  writer._readyPromise_resolve(void 0);
  writer._readyPromise_resolve = void 0;
  writer._readyPromise_reject = void 0;
  writer._readyPromiseState = "fulfilled";
}
function isDOMExceptionConstructor(ctor) {
  if (!(typeof ctor === "function" || typeof ctor === "object")) {
    return false;
  }
  try {
    new ctor();
    return true;
  } catch (_a) {
    return false;
  }
}
function createDOMExceptionPolyfill() {
  const ctor = function DOMException3(message, name) {
    this.message = message || "";
    this.name = name || "Error";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  };
  ctor.prototype = Object.create(Error.prototype);
  Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
  return ctor;
}
function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
  const reader = AcquireReadableStreamDefaultReader(source);
  const writer = AcquireWritableStreamDefaultWriter(dest);
  source._disturbed = true;
  let shuttingDown = false;
  let currentWrite = promiseResolvedWith(void 0);
  return newPromise((resolve, reject) => {
    let abortAlgorithm;
    if (signal !== void 0) {
      abortAlgorithm = () => {
        const error = new DOMException$1("Aborted", "AbortError");
        const actions = [];
        if (!preventAbort) {
          actions.push(() => {
            if (dest._state === "writable") {
              return WritableStreamAbort(dest, error);
            }
            return promiseResolvedWith(void 0);
          });
        }
        if (!preventCancel) {
          actions.push(() => {
            if (source._state === "readable") {
              return ReadableStreamCancel(source, error);
            }
            return promiseResolvedWith(void 0);
          });
        }
        shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
      };
      if (signal.aborted) {
        abortAlgorithm();
        return;
      }
      signal.addEventListener("abort", abortAlgorithm);
    }
    function pipeLoop() {
      return newPromise((resolveLoop, rejectLoop) => {
        function next(done) {
          if (done) {
            resolveLoop();
          } else {
            PerformPromiseThen(pipeStep(), next, rejectLoop);
          }
        }
        next(false);
      });
    }
    function pipeStep() {
      if (shuttingDown) {
        return promiseResolvedWith(true);
      }
      return PerformPromiseThen(writer._readyPromise, () => {
        return newPromise((resolveRead, rejectRead) => {
          ReadableStreamDefaultReaderRead(reader, {
            _chunkSteps: (chunk) => {
              currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
              resolveRead(false);
            },
            _closeSteps: () => resolveRead(true),
            _errorSteps: rejectRead
          });
        });
      });
    }
    isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
      if (!preventAbort) {
        shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
      } else {
        shutdown(true, storedError);
      }
    });
    isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
      if (!preventCancel) {
        shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
      } else {
        shutdown(true, storedError);
      }
    });
    isOrBecomesClosed(source, reader._closedPromise, () => {
      if (!preventClose) {
        shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
      } else {
        shutdown();
      }
    });
    if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
      const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
      if (!preventCancel) {
        shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
      } else {
        shutdown(true, destClosed);
      }
    }
    setPromiseIsHandledToTrue(pipeLoop());
    function waitForWritesToFinish() {
      const oldCurrentWrite = currentWrite;
      return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
    }
    function isOrBecomesErrored(stream, promise, action) {
      if (stream._state === "errored") {
        action(stream._storedError);
      } else {
        uponRejection(promise, action);
      }
    }
    function isOrBecomesClosed(stream, promise, action) {
      if (stream._state === "closed") {
        action();
      } else {
        uponFulfillment(promise, action);
      }
    }
    function shutdownWithAction(action, originalIsError, originalError) {
      if (shuttingDown) {
        return;
      }
      shuttingDown = true;
      if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
        uponFulfillment(waitForWritesToFinish(), doTheRest);
      } else {
        doTheRest();
      }
      function doTheRest() {
        uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
      }
    }
    function shutdown(isError, error) {
      if (shuttingDown) {
        return;
      }
      shuttingDown = true;
      if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
        uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
      } else {
        finalize(isError, error);
      }
    }
    function finalize(isError, error) {
      WritableStreamDefaultWriterRelease(writer);
      ReadableStreamReaderGenericRelease(reader);
      if (signal !== void 0) {
        signal.removeEventListener("abort", abortAlgorithm);
      }
      if (isError) {
        reject(error);
      } else {
        resolve(void 0);
      }
    }
  });
}
function IsReadableStreamDefaultController(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
    return false;
  }
  return x2 instanceof ReadableStreamDefaultController;
}
function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
  const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
  if (!shouldPull) {
    return;
  }
  if (controller._pulling) {
    controller._pullAgain = true;
    return;
  }
  controller._pulling = true;
  const pullPromise = controller._pullAlgorithm();
  uponPromise(pullPromise, () => {
    controller._pulling = false;
    if (controller._pullAgain) {
      controller._pullAgain = false;
      ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
  }, (e2) => {
    ReadableStreamDefaultControllerError(controller, e2);
  });
}
function ReadableStreamDefaultControllerShouldCallPull(controller) {
  const stream = controller._controlledReadableStream;
  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
    return false;
  }
  if (!controller._started) {
    return false;
  }
  if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
    return true;
  }
  const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
  if (desiredSize > 0) {
    return true;
  }
  return false;
}
function ReadableStreamDefaultControllerClearAlgorithms(controller) {
  controller._pullAlgorithm = void 0;
  controller._cancelAlgorithm = void 0;
  controller._strategySizeAlgorithm = void 0;
}
function ReadableStreamDefaultControllerClose(controller) {
  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
    return;
  }
  const stream = controller._controlledReadableStream;
  controller._closeRequested = true;
  if (controller._queue.length === 0) {
    ReadableStreamDefaultControllerClearAlgorithms(controller);
    ReadableStreamClose(stream);
  }
}
function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
    return;
  }
  const stream = controller._controlledReadableStream;
  if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
    ReadableStreamFulfillReadRequest(stream, chunk, false);
  } else {
    let chunkSize;
    try {
      chunkSize = controller._strategySizeAlgorithm(chunk);
    } catch (chunkSizeE) {
      ReadableStreamDefaultControllerError(controller, chunkSizeE);
      throw chunkSizeE;
    }
    try {
      EnqueueValueWithSize(controller, chunk, chunkSize);
    } catch (enqueueE) {
      ReadableStreamDefaultControllerError(controller, enqueueE);
      throw enqueueE;
    }
  }
  ReadableStreamDefaultControllerCallPullIfNeeded(controller);
}
function ReadableStreamDefaultControllerError(controller, e2) {
  const stream = controller._controlledReadableStream;
  if (stream._state !== "readable") {
    return;
  }
  ResetQueue(controller);
  ReadableStreamDefaultControllerClearAlgorithms(controller);
  ReadableStreamError(stream, e2);
}
function ReadableStreamDefaultControllerGetDesiredSize(controller) {
  const state = controller._controlledReadableStream._state;
  if (state === "errored") {
    return null;
  }
  if (state === "closed") {
    return 0;
  }
  return controller._strategyHWM - controller._queueTotalSize;
}
function ReadableStreamDefaultControllerHasBackpressure(controller) {
  if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
    return false;
  }
  return true;
}
function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
  const state = controller._controlledReadableStream._state;
  if (!controller._closeRequested && state === "readable") {
    return true;
  }
  return false;
}
function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
  controller._controlledReadableStream = stream;
  controller._queue = void 0;
  controller._queueTotalSize = void 0;
  ResetQueue(controller);
  controller._started = false;
  controller._closeRequested = false;
  controller._pullAgain = false;
  controller._pulling = false;
  controller._strategySizeAlgorithm = sizeAlgorithm;
  controller._strategyHWM = highWaterMark;
  controller._pullAlgorithm = pullAlgorithm;
  controller._cancelAlgorithm = cancelAlgorithm;
  stream._readableStreamController = controller;
  const startResult = startAlgorithm();
  uponPromise(promiseResolvedWith(startResult), () => {
    controller._started = true;
    ReadableStreamDefaultControllerCallPullIfNeeded(controller);
  }, (r2) => {
    ReadableStreamDefaultControllerError(controller, r2);
  });
}
function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
  const controller = Object.create(ReadableStreamDefaultController.prototype);
  let startAlgorithm = () => void 0;
  let pullAlgorithm = () => promiseResolvedWith(void 0);
  let cancelAlgorithm = () => promiseResolvedWith(void 0);
  if (underlyingSource.start !== void 0) {
    startAlgorithm = () => underlyingSource.start(controller);
  }
  if (underlyingSource.pull !== void 0) {
    pullAlgorithm = () => underlyingSource.pull(controller);
  }
  if (underlyingSource.cancel !== void 0) {
    cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
  }
  SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
}
function defaultControllerBrandCheckException$1(name) {
  return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
}
function ReadableStreamTee(stream, cloneForBranch2) {
  if (IsReadableByteStreamController(stream._readableStreamController)) {
    return ReadableByteStreamTee(stream);
  }
  return ReadableStreamDefaultTee(stream);
}
function ReadableStreamDefaultTee(stream, cloneForBranch2) {
  const reader = AcquireReadableStreamDefaultReader(stream);
  let reading = false;
  let readAgain = false;
  let canceled1 = false;
  let canceled2 = false;
  let reason1;
  let reason2;
  let branch1;
  let branch2;
  let resolveCancelPromise;
  const cancelPromise = newPromise((resolve) => {
    resolveCancelPromise = resolve;
  });
  function pullAlgorithm() {
    if (reading) {
      readAgain = true;
      return promiseResolvedWith(void 0);
    }
    reading = true;
    const readRequest = {
      _chunkSteps: (chunk) => {
        queueMicrotask(() => {
          readAgain = false;
          const chunk1 = chunk;
          const chunk2 = chunk;
          if (!canceled1) {
            ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
          }
          if (!canceled2) {
            ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
          }
          reading = false;
          if (readAgain) {
            pullAlgorithm();
          }
        });
      },
      _closeSteps: () => {
        reading = false;
        if (!canceled1) {
          ReadableStreamDefaultControllerClose(branch1._readableStreamController);
        }
        if (!canceled2) {
          ReadableStreamDefaultControllerClose(branch2._readableStreamController);
        }
        if (!canceled1 || !canceled2) {
          resolveCancelPromise(void 0);
        }
      },
      _errorSteps: () => {
        reading = false;
      }
    };
    ReadableStreamDefaultReaderRead(reader, readRequest);
    return promiseResolvedWith(void 0);
  }
  function cancel1Algorithm(reason) {
    canceled1 = true;
    reason1 = reason;
    if (canceled2) {
      const compositeReason = CreateArrayFromList([reason1, reason2]);
      const cancelResult = ReadableStreamCancel(stream, compositeReason);
      resolveCancelPromise(cancelResult);
    }
    return cancelPromise;
  }
  function cancel2Algorithm(reason) {
    canceled2 = true;
    reason2 = reason;
    if (canceled1) {
      const compositeReason = CreateArrayFromList([reason1, reason2]);
      const cancelResult = ReadableStreamCancel(stream, compositeReason);
      resolveCancelPromise(cancelResult);
    }
    return cancelPromise;
  }
  function startAlgorithm() {
  }
  branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
  branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
  uponRejection(reader._closedPromise, (r2) => {
    ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
    ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
    if (!canceled1 || !canceled2) {
      resolveCancelPromise(void 0);
    }
  });
  return [branch1, branch2];
}
function ReadableByteStreamTee(stream) {
  let reader = AcquireReadableStreamDefaultReader(stream);
  let reading = false;
  let readAgainForBranch1 = false;
  let readAgainForBranch2 = false;
  let canceled1 = false;
  let canceled2 = false;
  let reason1;
  let reason2;
  let branch1;
  let branch2;
  let resolveCancelPromise;
  const cancelPromise = newPromise((resolve) => {
    resolveCancelPromise = resolve;
  });
  function forwardReaderError(thisReader) {
    uponRejection(thisReader._closedPromise, (r2) => {
      if (thisReader !== reader) {
        return;
      }
      ReadableByteStreamControllerError(branch1._readableStreamController, r2);
      ReadableByteStreamControllerError(branch2._readableStreamController, r2);
      if (!canceled1 || !canceled2) {
        resolveCancelPromise(void 0);
      }
    });
  }
  function pullWithDefaultReader() {
    if (IsReadableStreamBYOBReader(reader)) {
      ReadableStreamReaderGenericRelease(reader);
      reader = AcquireReadableStreamDefaultReader(stream);
      forwardReaderError(reader);
    }
    const readRequest = {
      _chunkSteps: (chunk) => {
        queueMicrotask(() => {
          readAgainForBranch1 = false;
          readAgainForBranch2 = false;
          const chunk1 = chunk;
          let chunk2 = chunk;
          if (!canceled1 && !canceled2) {
            try {
              chunk2 = CloneAsUint8Array(chunk);
            } catch (cloneE) {
              ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
              ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
              resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
              return;
            }
          }
          if (!canceled1) {
            ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
          }
          if (!canceled2) {
            ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
          }
          reading = false;
          if (readAgainForBranch1) {
            pull1Algorithm();
          } else if (readAgainForBranch2) {
            pull2Algorithm();
          }
        });
      },
      _closeSteps: () => {
        reading = false;
        if (!canceled1) {
          ReadableByteStreamControllerClose(branch1._readableStreamController);
        }
        if (!canceled2) {
          ReadableByteStreamControllerClose(branch2._readableStreamController);
        }
        if (branch1._readableStreamController._pendingPullIntos.length > 0) {
          ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
        }
        if (branch2._readableStreamController._pendingPullIntos.length > 0) {
          ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
        }
        if (!canceled1 || !canceled2) {
          resolveCancelPromise(void 0);
        }
      },
      _errorSteps: () => {
        reading = false;
      }
    };
    ReadableStreamDefaultReaderRead(reader, readRequest);
  }
  function pullWithBYOBReader(view, forBranch2) {
    if (IsReadableStreamDefaultReader(reader)) {
      ReadableStreamReaderGenericRelease(reader);
      reader = AcquireReadableStreamBYOBReader(stream);
      forwardReaderError(reader);
    }
    const byobBranch = forBranch2 ? branch2 : branch1;
    const otherBranch = forBranch2 ? branch1 : branch2;
    const readIntoRequest = {
      _chunkSteps: (chunk) => {
        queueMicrotask(() => {
          readAgainForBranch1 = false;
          readAgainForBranch2 = false;
          const byobCanceled = forBranch2 ? canceled2 : canceled1;
          const otherCanceled = forBranch2 ? canceled1 : canceled2;
          if (!otherCanceled) {
            let clonedChunk;
            try {
              clonedChunk = CloneAsUint8Array(chunk);
            } catch (cloneE) {
              ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
              ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
              resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
              return;
            }
            if (!byobCanceled) {
              ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
            }
            ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
          } else if (!byobCanceled) {
            ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
          }
          reading = false;
          if (readAgainForBranch1) {
            pull1Algorithm();
          } else if (readAgainForBranch2) {
            pull2Algorithm();
          }
        });
      },
      _closeSteps: (chunk) => {
        reading = false;
        const byobCanceled = forBranch2 ? canceled2 : canceled1;
        const otherCanceled = forBranch2 ? canceled1 : canceled2;
        if (!byobCanceled) {
          ReadableByteStreamControllerClose(byobBranch._readableStreamController);
        }
        if (!otherCanceled) {
          ReadableByteStreamControllerClose(otherBranch._readableStreamController);
        }
        if (chunk !== void 0) {
          if (!byobCanceled) {
            ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
          }
          if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
            ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
          }
        }
        if (!byobCanceled || !otherCanceled) {
          resolveCancelPromise(void 0);
        }
      },
      _errorSteps: () => {
        reading = false;
      }
    };
    ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
  }
  function pull1Algorithm() {
    if (reading) {
      readAgainForBranch1 = true;
      return promiseResolvedWith(void 0);
    }
    reading = true;
    const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
    if (byobRequest === null) {
      pullWithDefaultReader();
    } else {
      pullWithBYOBReader(byobRequest._view, false);
    }
    return promiseResolvedWith(void 0);
  }
  function pull2Algorithm() {
    if (reading) {
      readAgainForBranch2 = true;
      return promiseResolvedWith(void 0);
    }
    reading = true;
    const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
    if (byobRequest === null) {
      pullWithDefaultReader();
    } else {
      pullWithBYOBReader(byobRequest._view, true);
    }
    return promiseResolvedWith(void 0);
  }
  function cancel1Algorithm(reason) {
    canceled1 = true;
    reason1 = reason;
    if (canceled2) {
      const compositeReason = CreateArrayFromList([reason1, reason2]);
      const cancelResult = ReadableStreamCancel(stream, compositeReason);
      resolveCancelPromise(cancelResult);
    }
    return cancelPromise;
  }
  function cancel2Algorithm(reason) {
    canceled2 = true;
    reason2 = reason;
    if (canceled1) {
      const compositeReason = CreateArrayFromList([reason1, reason2]);
      const cancelResult = ReadableStreamCancel(stream, compositeReason);
      resolveCancelPromise(cancelResult);
    }
    return cancelPromise;
  }
  function startAlgorithm() {
    return;
  }
  branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
  branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
  forwardReaderError(reader);
  return [branch1, branch2];
}
function convertUnderlyingDefaultOrByteSource(source, context) {
  assertDictionary(source, context);
  const original = source;
  const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
  const cancel = original === null || original === void 0 ? void 0 : original.cancel;
  const pull = original === null || original === void 0 ? void 0 : original.pull;
  const start = original === null || original === void 0 ? void 0 : original.start;
  const type = original === null || original === void 0 ? void 0 : original.type;
  return {
    autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
    cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
    pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
    start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
    type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
  };
}
function convertUnderlyingSourceCancelCallback(fn, original, context) {
  assertFunction(fn, context);
  return (reason) => promiseCall(fn, original, [reason]);
}
function convertUnderlyingSourcePullCallback(fn, original, context) {
  assertFunction(fn, context);
  return (controller) => promiseCall(fn, original, [controller]);
}
function convertUnderlyingSourceStartCallback(fn, original, context) {
  assertFunction(fn, context);
  return (controller) => reflectCall(fn, original, [controller]);
}
function convertReadableStreamType(type, context) {
  type = `${type}`;
  if (type !== "bytes") {
    throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
  }
  return type;
}
function convertReaderOptions(options, context) {
  assertDictionary(options, context);
  const mode = options === null || options === void 0 ? void 0 : options.mode;
  return {
    mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
  };
}
function convertReadableStreamReaderMode(mode, context) {
  mode = `${mode}`;
  if (mode !== "byob") {
    throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
  }
  return mode;
}
function convertIteratorOptions(options, context) {
  assertDictionary(options, context);
  const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
  return { preventCancel: Boolean(preventCancel) };
}
function convertPipeOptions(options, context) {
  assertDictionary(options, context);
  const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
  const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
  const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
  const signal = options === null || options === void 0 ? void 0 : options.signal;
  if (signal !== void 0) {
    assertAbortSignal(signal, `${context} has member 'signal' that`);
  }
  return {
    preventAbort: Boolean(preventAbort),
    preventCancel: Boolean(preventCancel),
    preventClose: Boolean(preventClose),
    signal
  };
}
function assertAbortSignal(signal, context) {
  if (!isAbortSignal2(signal)) {
    throw new TypeError(`${context} is not an AbortSignal.`);
  }
}
function convertReadableWritablePair(pair, context) {
  assertDictionary(pair, context);
  const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
  assertRequiredField(readable, "readable", "ReadableWritablePair");
  assertReadableStream(readable, `${context} has member 'readable' that`);
  const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
  assertRequiredField(writable, "writable", "ReadableWritablePair");
  assertWritableStream(writable, `${context} has member 'writable' that`);
  return { readable, writable };
}
function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
  const stream = Object.create(ReadableStream2.prototype);
  InitializeReadableStream(stream);
  const controller = Object.create(ReadableStreamDefaultController.prototype);
  SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
  return stream;
}
function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
  const stream = Object.create(ReadableStream2.prototype);
  InitializeReadableStream(stream);
  const controller = Object.create(ReadableByteStreamController.prototype);
  SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
  return stream;
}
function InitializeReadableStream(stream) {
  stream._state = "readable";
  stream._reader = void 0;
  stream._storedError = void 0;
  stream._disturbed = false;
}
function IsReadableStream(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
    return false;
  }
  return x2 instanceof ReadableStream2;
}
function IsReadableStreamLocked(stream) {
  if (stream._reader === void 0) {
    return false;
  }
  return true;
}
function ReadableStreamCancel(stream, reason) {
  stream._disturbed = true;
  if (stream._state === "closed") {
    return promiseResolvedWith(void 0);
  }
  if (stream._state === "errored") {
    return promiseRejectedWith(stream._storedError);
  }
  ReadableStreamClose(stream);
  const reader = stream._reader;
  if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
    reader._readIntoRequests.forEach((readIntoRequest) => {
      readIntoRequest._closeSteps(void 0);
    });
    reader._readIntoRequests = new SimpleQueue();
  }
  const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
  return transformPromiseWith(sourceCancelPromise, noop2);
}
function ReadableStreamClose(stream) {
  stream._state = "closed";
  const reader = stream._reader;
  if (reader === void 0) {
    return;
  }
  defaultReaderClosedPromiseResolve(reader);
  if (IsReadableStreamDefaultReader(reader)) {
    reader._readRequests.forEach((readRequest) => {
      readRequest._closeSteps();
    });
    reader._readRequests = new SimpleQueue();
  }
}
function ReadableStreamError(stream, e2) {
  stream._state = "errored";
  stream._storedError = e2;
  const reader = stream._reader;
  if (reader === void 0) {
    return;
  }
  defaultReaderClosedPromiseReject(reader, e2);
  if (IsReadableStreamDefaultReader(reader)) {
    reader._readRequests.forEach((readRequest) => {
      readRequest._errorSteps(e2);
    });
    reader._readRequests = new SimpleQueue();
  } else {
    reader._readIntoRequests.forEach((readIntoRequest) => {
      readIntoRequest._errorSteps(e2);
    });
    reader._readIntoRequests = new SimpleQueue();
  }
}
function streamBrandCheckException$1(name) {
  return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
}
function convertQueuingStrategyInit(init, context) {
  assertDictionary(init, context);
  const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
  assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
  return {
    highWaterMark: convertUnrestrictedDouble(highWaterMark)
  };
}
function byteLengthBrandCheckException(name) {
  return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
}
function IsByteLengthQueuingStrategy(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
    return false;
  }
  return x2 instanceof ByteLengthQueuingStrategy;
}
function countBrandCheckException(name) {
  return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
}
function IsCountQueuingStrategy(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
    return false;
  }
  return x2 instanceof CountQueuingStrategy;
}
function convertTransformer(original, context) {
  assertDictionary(original, context);
  const flush = original === null || original === void 0 ? void 0 : original.flush;
  const readableType = original === null || original === void 0 ? void 0 : original.readableType;
  const start = original === null || original === void 0 ? void 0 : original.start;
  const transform = original === null || original === void 0 ? void 0 : original.transform;
  const writableType = original === null || original === void 0 ? void 0 : original.writableType;
  return {
    flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
    readableType,
    start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
    transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
    writableType
  };
}
function convertTransformerFlushCallback(fn, original, context) {
  assertFunction(fn, context);
  return (controller) => promiseCall(fn, original, [controller]);
}
function convertTransformerStartCallback(fn, original, context) {
  assertFunction(fn, context);
  return (controller) => reflectCall(fn, original, [controller]);
}
function convertTransformerTransformCallback(fn, original, context) {
  assertFunction(fn, context);
  return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
}
function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
  function startAlgorithm() {
    return startPromise;
  }
  function writeAlgorithm(chunk) {
    return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
  }
  function abortAlgorithm(reason) {
    return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
  }
  function closeAlgorithm() {
    return TransformStreamDefaultSinkCloseAlgorithm(stream);
  }
  stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
  function pullAlgorithm() {
    return TransformStreamDefaultSourcePullAlgorithm(stream);
  }
  function cancelAlgorithm(reason) {
    TransformStreamErrorWritableAndUnblockWrite(stream, reason);
    return promiseResolvedWith(void 0);
  }
  stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
  stream._backpressure = void 0;
  stream._backpressureChangePromise = void 0;
  stream._backpressureChangePromise_resolve = void 0;
  TransformStreamSetBackpressure(stream, true);
  stream._transformStreamController = void 0;
}
function IsTransformStream(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
    return false;
  }
  return x2 instanceof TransformStream;
}
function TransformStreamError(stream, e2) {
  ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
  TransformStreamErrorWritableAndUnblockWrite(stream, e2);
}
function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
  TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
  WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
  if (stream._backpressure) {
    TransformStreamSetBackpressure(stream, false);
  }
}
function TransformStreamSetBackpressure(stream, backpressure) {
  if (stream._backpressureChangePromise !== void 0) {
    stream._backpressureChangePromise_resolve();
  }
  stream._backpressureChangePromise = newPromise((resolve) => {
    stream._backpressureChangePromise_resolve = resolve;
  });
  stream._backpressure = backpressure;
}
function IsTransformStreamDefaultController(x2) {
  if (!typeIsObject(x2)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
    return false;
  }
  return x2 instanceof TransformStreamDefaultController;
}
function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
  controller._controlledTransformStream = stream;
  stream._transformStreamController = controller;
  controller._transformAlgorithm = transformAlgorithm;
  controller._flushAlgorithm = flushAlgorithm;
}
function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
  const controller = Object.create(TransformStreamDefaultController.prototype);
  let transformAlgorithm = (chunk) => {
    try {
      TransformStreamDefaultControllerEnqueue(controller, chunk);
      return promiseResolvedWith(void 0);
    } catch (transformResultE) {
      return promiseRejectedWith(transformResultE);
    }
  };
  let flushAlgorithm = () => promiseResolvedWith(void 0);
  if (transformer.transform !== void 0) {
    transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
  }
  if (transformer.flush !== void 0) {
    flushAlgorithm = () => transformer.flush(controller);
  }
  SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
}
function TransformStreamDefaultControllerClearAlgorithms(controller) {
  controller._transformAlgorithm = void 0;
  controller._flushAlgorithm = void 0;
}
function TransformStreamDefaultControllerEnqueue(controller, chunk) {
  const stream = controller._controlledTransformStream;
  const readableController = stream._readable._readableStreamController;
  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
    throw new TypeError("Readable side is not in a state that permits enqueue");
  }
  try {
    ReadableStreamDefaultControllerEnqueue(readableController, chunk);
  } catch (e2) {
    TransformStreamErrorWritableAndUnblockWrite(stream, e2);
    throw stream._readable._storedError;
  }
  const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
  if (backpressure !== stream._backpressure) {
    TransformStreamSetBackpressure(stream, true);
  }
}
function TransformStreamDefaultControllerError(controller, e2) {
  TransformStreamError(controller._controlledTransformStream, e2);
}
function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
  const transformPromise = controller._transformAlgorithm(chunk);
  return transformPromiseWith(transformPromise, void 0, (r2) => {
    TransformStreamError(controller._controlledTransformStream, r2);
    throw r2;
  });
}
function TransformStreamDefaultControllerTerminate(controller) {
  const stream = controller._controlledTransformStream;
  const readableController = stream._readable._readableStreamController;
  ReadableStreamDefaultControllerClose(readableController);
  const error = new TypeError("TransformStream terminated");
  TransformStreamErrorWritableAndUnblockWrite(stream, error);
}
function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
  const controller = stream._transformStreamController;
  if (stream._backpressure) {
    const backpressureChangePromise = stream._backpressureChangePromise;
    return transformPromiseWith(backpressureChangePromise, () => {
      const writable = stream._writable;
      const state = writable._state;
      if (state === "erroring") {
        throw writable._storedError;
      }
      return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    });
  }
  return TransformStreamDefaultControllerPerformTransform(controller, chunk);
}
function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
  TransformStreamError(stream, reason);
  return promiseResolvedWith(void 0);
}
function TransformStreamDefaultSinkCloseAlgorithm(stream) {
  const readable = stream._readable;
  const controller = stream._transformStreamController;
  const flushPromise = controller._flushAlgorithm();
  TransformStreamDefaultControllerClearAlgorithms(controller);
  return transformPromiseWith(flushPromise, () => {
    if (readable._state === "errored") {
      throw readable._storedError;
    }
    ReadableStreamDefaultControllerClose(readable._readableStreamController);
  }, (r2) => {
    TransformStreamError(stream, r2);
    throw readable._storedError;
  });
}
function TransformStreamDefaultSourcePullAlgorithm(stream) {
  TransformStreamSetBackpressure(stream, false);
  return stream._backpressureChangePromise;
}
function defaultControllerBrandCheckException(name) {
  return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
}
function streamBrandCheckException(name) {
  return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
}
var SymbolPolyfill, globals, rethrowAssertionErrorRejection, originalPromise, originalPromiseThen, originalPromiseResolve, originalPromiseReject, queueMicrotask, QUEUE_MAX_ARRAY_SIZE, SimpleQueue, AbortSteps, ErrorSteps, CancelSteps, PullSteps, NumberIsFinite, MathTrunc, ReadableStreamDefaultReader, AsyncIteratorPrototype, ReadableStreamAsyncIteratorImpl, ReadableStreamAsyncIteratorPrototype, NumberIsNaN, ReadableStreamBYOBRequest, ReadableByteStreamController, ReadableStreamBYOBReader, supportsAbortController2, WritableStream, WritableStreamDefaultWriter, closeSentinel, WritableStreamDefaultController, NativeDOMException, DOMException$1, ReadableStreamDefaultController, ReadableStream2, byteLengthSizeFunction, ByteLengthQueuingStrategy, countSizeFunction, CountQueuingStrategy, TransformStream, TransformStreamDefaultController;
var init_ponyfill_es6 = __esm({
  "pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/web-streams-polyfill-npm-3.2.1-835bd3857e-b119c78574.zip/node_modules/web-streams-polyfill/dist/ponyfill.es6.mjs"() {
    SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
    globals = getGlobals();
    rethrowAssertionErrorRejection = noop2;
    originalPromise = Promise;
    originalPromiseThen = Promise.prototype.then;
    originalPromiseResolve = Promise.resolve.bind(originalPromise);
    originalPromiseReject = Promise.reject.bind(originalPromise);
    queueMicrotask = (() => {
      const globalQueueMicrotask = globals && globals.queueMicrotask;
      if (typeof globalQueueMicrotask === "function") {
        return globalQueueMicrotask;
      }
      const resolvedPromise = promiseResolvedWith(void 0);
      return (fn) => PerformPromiseThen(resolvedPromise, fn);
    })();
    QUEUE_MAX_ARRAY_SIZE = 16384;
    SimpleQueue = class {
      constructor() {
        this._cursor = 0;
        this._size = 0;
        this._front = {
          _elements: [],
          _next: void 0
        };
        this._back = this._front;
        this._cursor = 0;
        this._size = 0;
      }
      get length() {
        return this._size;
      }
      push(element) {
        const oldBack = this._back;
        let newBack = oldBack;
        if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
          newBack = {
            _elements: [],
            _next: void 0
          };
        }
        oldBack._elements.push(element);
        if (newBack !== oldBack) {
          this._back = newBack;
          oldBack._next = newBack;
        }
        ++this._size;
      }
      shift() {
        const oldFront = this._front;
        let newFront = oldFront;
        const oldCursor = this._cursor;
        let newCursor = oldCursor + 1;
        const elements = oldFront._elements;
        const element = elements[oldCursor];
        if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
          newFront = oldFront._next;
          newCursor = 0;
        }
        --this._size;
        this._cursor = newCursor;
        if (oldFront !== newFront) {
          this._front = newFront;
        }
        elements[oldCursor] = void 0;
        return element;
      }
      forEach(callback) {
        let i2 = this._cursor;
        let node = this._front;
        let elements = node._elements;
        while (i2 !== elements.length || node._next !== void 0) {
          if (i2 === elements.length) {
            node = node._next;
            elements = node._elements;
            i2 = 0;
            if (elements.length === 0) {
              break;
            }
          }
          callback(elements[i2]);
          ++i2;
        }
      }
      peek() {
        const front = this._front;
        const cursor = this._cursor;
        return front._elements[cursor];
      }
    };
    AbortSteps = SymbolPolyfill("[[AbortSteps]]");
    ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
    CancelSteps = SymbolPolyfill("[[CancelSteps]]");
    PullSteps = SymbolPolyfill("[[PullSteps]]");
    NumberIsFinite = Number.isFinite || function(x2) {
      return typeof x2 === "number" && isFinite(x2);
    };
    MathTrunc = Math.trunc || function(v) {
      return v < 0 ? Math.ceil(v) : Math.floor(v);
    };
    ReadableStreamDefaultReader = class {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("read"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve, reject) => {
          resolvePromise = resolve;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: () => resolvePromise({ value: void 0, done: true }),
          _errorSteps: (e2) => rejectPromise(e2)
        };
        ReadableStreamDefaultReaderRead(this, readRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamDefaultReader(this)) {
          throw defaultReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    };
    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultReader",
        configurable: true
      });
    }
    if (typeof SymbolPolyfill.asyncIterator === "symbol") {
      AsyncIteratorPrototype = {
        [SymbolPolyfill.asyncIterator]() {
          return this;
        }
      };
      Object.defineProperty(AsyncIteratorPrototype, SymbolPolyfill.asyncIterator, { enumerable: false });
    }
    ReadableStreamAsyncIteratorImpl = class {
      constructor(reader, preventCancel) {
        this._ongoingPromise = void 0;
        this._isFinished = false;
        this._reader = reader;
        this._preventCancel = preventCancel;
      }
      next() {
        const nextSteps = () => this._nextSteps();
        this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
        return this._ongoingPromise;
      }
      return(value) {
        const returnSteps = () => this._returnSteps(value);
        return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
      }
      _nextSteps() {
        if (this._isFinished) {
          return Promise.resolve({ value: void 0, done: true });
        }
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("iterate"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve, reject) => {
          resolvePromise = resolve;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => {
            this._ongoingPromise = void 0;
            queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
          },
          _closeSteps: () => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            resolvePromise({ value: void 0, done: true });
          },
          _errorSteps: (reason) => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            rejectPromise(reason);
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promise;
      }
      _returnSteps(value) {
        if (this._isFinished) {
          return Promise.resolve({ value, done: true });
        }
        this._isFinished = true;
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("finish iterating"));
        }
        if (!this._preventCancel) {
          const result = ReadableStreamReaderGenericCancel(reader, value);
          ReadableStreamReaderGenericRelease(reader);
          return transformPromiseWith(result, () => ({ value, done: true }));
        }
        ReadableStreamReaderGenericRelease(reader);
        return promiseResolvedWith({ value, done: true });
      }
    };
    ReadableStreamAsyncIteratorPrototype = {
      next() {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
        }
        return this._asyncIteratorImpl.next();
      },
      return(value) {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
        }
        return this._asyncIteratorImpl.return(value);
      }
    };
    if (AsyncIteratorPrototype !== void 0) {
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
    }
    NumberIsNaN = Number.isNaN || function(x2) {
      return x2 !== x2;
    };
    ReadableStreamBYOBRequest = class {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get view() {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("view");
        }
        return this._view;
      }
      respond(bytesWritten) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respond");
        }
        assertRequiredArgument(bytesWritten, 1, "respond");
        bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(this._view.buffer))
          ;
        ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
      }
      respondWithNewView(view) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respondWithNewView");
        }
        assertRequiredArgument(view, 1, "respondWithNewView");
        if (!ArrayBuffer.isView(view)) {
          throw new TypeError("You can only respond with array buffer views");
        }
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
      }
    };
    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
      respond: { enumerable: true },
      respondWithNewView: { enumerable: true },
      view: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBRequest",
        configurable: true
      });
    }
    ReadableByteStreamController = class {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get byobRequest() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("byobRequest");
        }
        return ReadableByteStreamControllerGetBYOBRequest(this);
      }
      get desiredSize() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("desiredSize");
        }
        return ReadableByteStreamControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("close");
        }
        if (this._closeRequested) {
          throw new TypeError("The stream has already been closed; do not close it again!");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
        }
        ReadableByteStreamControllerClose(this);
      }
      enqueue(chunk) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("enqueue");
        }
        assertRequiredArgument(chunk, 1, "enqueue");
        if (!ArrayBuffer.isView(chunk)) {
          throw new TypeError("chunk must be an array buffer view");
        }
        if (chunk.byteLength === 0) {
          throw new TypeError("chunk must have non-zero byteLength");
        }
        if (chunk.buffer.byteLength === 0) {
          throw new TypeError(`chunk's buffer must have non-zero byteLength`);
        }
        if (this._closeRequested) {
          throw new TypeError("stream is closed or draining");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
        }
        ReadableByteStreamControllerEnqueue(this, chunk);
      }
      error(e2 = void 0) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("error");
        }
        ReadableByteStreamControllerError(this, e2);
      }
      [CancelSteps](reason) {
        ReadableByteStreamControllerClearPendingPullIntos(this);
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableByteStreamControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableByteStream;
        if (this._queueTotalSize > 0) {
          const entry = this._queue.shift();
          this._queueTotalSize -= entry.byteLength;
          ReadableByteStreamControllerHandleQueueDrain(this);
          const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
          readRequest._chunkSteps(view);
          return;
        }
        const autoAllocateChunkSize = this._autoAllocateChunkSize;
        if (autoAllocateChunkSize !== void 0) {
          let buffer;
          try {
            buffer = new ArrayBuffer(autoAllocateChunkSize);
          } catch (bufferE) {
            readRequest._errorSteps(bufferE);
            return;
          }
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: autoAllocateChunkSize,
            byteOffset: 0,
            byteLength: autoAllocateChunkSize,
            bytesFilled: 0,
            elementSize: 1,
            viewConstructor: Uint8Array,
            readerType: "default"
          };
          this._pendingPullIntos.push(pullIntoDescriptor);
        }
        ReadableStreamAddReadRequest(stream, readRequest);
        ReadableByteStreamControllerCallPullIfNeeded(this);
      }
    };
    Object.defineProperties(ReadableByteStreamController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      byobRequest: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableByteStreamController",
        configurable: true
      });
    }
    ReadableStreamBYOBReader = class {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        if (!IsReadableByteStreamController(stream._readableStreamController)) {
          throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readIntoRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read(view) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("read"));
        }
        if (!ArrayBuffer.isView(view)) {
          return promiseRejectedWith(new TypeError("view must be an array buffer view"));
        }
        if (view.byteLength === 0) {
          return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
        }
        if (view.buffer.byteLength === 0) {
          return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve, reject) => {
          resolvePromise = resolve;
          rejectPromise = reject;
        });
        const readIntoRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
          _errorSteps: (e2) => rejectPromise(e2)
        };
        ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamBYOBReader(this)) {
          throw byobReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readIntoRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    };
    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBReader",
        configurable: true
      });
    }
    supportsAbortController2 = typeof AbortController === "function";
    WritableStream = class {
      constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
        if (rawUnderlyingSink === void 0) {
          rawUnderlyingSink = null;
        } else {
          assertObject(rawUnderlyingSink, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
        InitializeWritableStream(this);
        const type = underlyingSink.type;
        if (type !== void 0) {
          throw new RangeError("Invalid type is specified");
        }
        const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
        const highWaterMark = ExtractHighWaterMark(strategy, 1);
        SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
      }
      get locked() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("locked");
        }
        return IsWritableStreamLocked(this);
      }
      abort(reason = void 0) {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("abort"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
        }
        return WritableStreamAbort(this, reason);
      }
      close() {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("close"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
        }
        if (WritableStreamCloseQueuedOrInFlight(this)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamClose(this);
      }
      getWriter() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("getWriter");
        }
        return AcquireWritableStreamDefaultWriter(this);
      }
    };
    Object.defineProperties(WritableStream.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      getWriter: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStream",
        configurable: true
      });
    }
    WritableStreamDefaultWriter = class {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
        assertWritableStream(stream, "First parameter");
        if (IsWritableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive writing by another writer");
        }
        this._ownerWritableStream = stream;
        stream._writer = this;
        const state = stream._state;
        if (state === "writable") {
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
            defaultWriterReadyPromiseInitialize(this);
          } else {
            defaultWriterReadyPromiseInitializeAsResolved(this);
          }
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "erroring") {
          defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "closed") {
          defaultWriterReadyPromiseInitializeAsResolved(this);
          defaultWriterClosedPromiseInitializeAsResolved(this);
        } else {
          const storedError = stream._storedError;
          defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
          defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
        }
      }
      get closed() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      get desiredSize() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("desiredSize");
        }
        if (this._ownerWritableStream === void 0) {
          throw defaultWriterLockException("desiredSize");
        }
        return WritableStreamDefaultWriterGetDesiredSize(this);
      }
      get ready() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
        }
        return this._readyPromise;
      }
      abort(reason = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("abort"));
        }
        return WritableStreamDefaultWriterAbort(this, reason);
      }
      close() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("close"));
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("close"));
        }
        if (WritableStreamCloseQueuedOrInFlight(stream)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamDefaultWriterClose(this);
      }
      releaseLock() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("releaseLock");
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return;
        }
        WritableStreamDefaultWriterRelease(this);
      }
      write(chunk = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("write"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        return WritableStreamDefaultWriterWrite(this, chunk);
      }
    };
    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      releaseLock: { enumerable: true },
      write: { enumerable: true },
      closed: { enumerable: true },
      desiredSize: { enumerable: true },
      ready: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultWriter",
        configurable: true
      });
    }
    closeSentinel = {};
    WritableStreamDefaultController = class {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get abortReason() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("abortReason");
        }
        return this._abortReason;
      }
      get signal() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("signal");
        }
        if (this._abortController === void 0) {
          throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
        }
        return this._abortController.signal;
      }
      error(e2 = void 0) {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("error");
        }
        const state = this._controlledWritableStream._state;
        if (state !== "writable") {
          return;
        }
        WritableStreamDefaultControllerError(this, e2);
      }
      [AbortSteps](reason) {
        const result = this._abortAlgorithm(reason);
        WritableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [ErrorSteps]() {
        ResetQueue(this);
      }
    };
    Object.defineProperties(WritableStreamDefaultController.prototype, {
      abortReason: { enumerable: true },
      signal: { enumerable: true },
      error: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultController",
        configurable: true
      });
    }
    NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
    DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
    ReadableStreamDefaultController = class {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("desiredSize");
        }
        return ReadableStreamDefaultControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("close");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits close");
        }
        ReadableStreamDefaultControllerClose(this);
      }
      enqueue(chunk = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("enqueue");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits enqueue");
        }
        return ReadableStreamDefaultControllerEnqueue(this, chunk);
      }
      error(e2 = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("error");
        }
        ReadableStreamDefaultControllerError(this, e2);
      }
      [CancelSteps](reason) {
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableStream;
        if (this._queue.length > 0) {
          const chunk = DequeueValue(this);
          if (this._closeRequested && this._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(this);
            ReadableStreamClose(stream);
          } else {
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
          readRequest._chunkSteps(chunk);
        } else {
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableStreamDefaultControllerCallPullIfNeeded(this);
        }
      }
    };
    Object.defineProperties(ReadableStreamDefaultController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultController",
        configurable: true
      });
    }
    ReadableStream2 = class {
      constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
        if (rawUnderlyingSource === void 0) {
          rawUnderlyingSource = null;
        } else {
          assertObject(rawUnderlyingSource, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
        InitializeReadableStream(this);
        if (underlyingSource.type === "bytes") {
          if (strategy.size !== void 0) {
            throw new RangeError("The strategy for a byte stream cannot have a size function");
          }
          const highWaterMark = ExtractHighWaterMark(strategy, 0);
          SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
        } else {
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
        }
      }
      get locked() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("locked");
        }
        return IsReadableStreamLocked(this);
      }
      cancel(reason = void 0) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("cancel"));
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
        }
        return ReadableStreamCancel(this, reason);
      }
      getReader(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("getReader");
        }
        const options = convertReaderOptions(rawOptions, "First parameter");
        if (options.mode === void 0) {
          return AcquireReadableStreamDefaultReader(this);
        }
        return AcquireReadableStreamBYOBReader(this);
      }
      pipeThrough(rawTransform, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("pipeThrough");
        }
        assertRequiredArgument(rawTransform, 1, "pipeThrough");
        const transform = convertReadableWritablePair(rawTransform, "First parameter");
        const options = convertPipeOptions(rawOptions, "Second parameter");
        if (IsReadableStreamLocked(this)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
        }
        if (IsWritableStreamLocked(transform.writable)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
        }
        const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        setPromiseIsHandledToTrue(promise);
        return transform.readable;
      }
      pipeTo(destination, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
        }
        if (destination === void 0) {
          return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
        }
        if (!IsWritableStream(destination)) {
          return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
        }
        let options;
        try {
          options = convertPipeOptions(rawOptions, "Second parameter");
        } catch (e2) {
          return promiseRejectedWith(e2);
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
        }
        if (IsWritableStreamLocked(destination)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
        }
        return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
      }
      tee() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("tee");
        }
        const branches = ReadableStreamTee(this);
        return CreateArrayFromList(branches);
      }
      values(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("values");
        }
        const options = convertIteratorOptions(rawOptions, "First parameter");
        return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
      }
    };
    Object.defineProperties(ReadableStream2.prototype, {
      cancel: { enumerable: true },
      getReader: { enumerable: true },
      pipeThrough: { enumerable: true },
      pipeTo: { enumerable: true },
      tee: { enumerable: true },
      values: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStream",
        configurable: true
      });
    }
    if (typeof SymbolPolyfill.asyncIterator === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
    }
    byteLengthSizeFunction = (chunk) => {
      return chunk.byteLength;
    };
    try {
      Object.defineProperty(byteLengthSizeFunction, "name", {
        value: "size",
        configurable: true
      });
    } catch (_a) {
    }
    ByteLengthQueuingStrategy = class {
      constructor(options) {
        assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
        options = convertQueuingStrategyInit(options, "First parameter");
        this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
      }
      get highWaterMark() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("highWaterMark");
        }
        return this._byteLengthQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("size");
        }
        return byteLengthSizeFunction;
      }
    };
    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "ByteLengthQueuingStrategy",
        configurable: true
      });
    }
    countSizeFunction = () => {
      return 1;
    };
    try {
      Object.defineProperty(countSizeFunction, "name", {
        value: "size",
        configurable: true
      });
    } catch (_a) {
    }
    CountQueuingStrategy = class {
      constructor(options) {
        assertRequiredArgument(options, 1, "CountQueuingStrategy");
        options = convertQueuingStrategyInit(options, "First parameter");
        this._countQueuingStrategyHighWaterMark = options.highWaterMark;
      }
      get highWaterMark() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("highWaterMark");
        }
        return this._countQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("size");
        }
        return countSizeFunction;
      }
    };
    Object.defineProperties(CountQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "CountQueuingStrategy",
        configurable: true
      });
    }
    TransformStream = class {
      constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
        if (rawTransformer === void 0) {
          rawTransformer = null;
        }
        const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
        const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
        const transformer = convertTransformer(rawTransformer, "First parameter");
        if (transformer.readableType !== void 0) {
          throw new RangeError("Invalid readableType specified");
        }
        if (transformer.writableType !== void 0) {
          throw new RangeError("Invalid writableType specified");
        }
        const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
        const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
        const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
        const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
        let startPromise_resolve;
        const startPromise = newPromise((resolve) => {
          startPromise_resolve = resolve;
        });
        InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
        if (transformer.start !== void 0) {
          startPromise_resolve(transformer.start(this._transformStreamController));
        } else {
          startPromise_resolve(void 0);
        }
      }
      get readable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("readable");
        }
        return this._readable;
      }
      get writable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("writable");
        }
        return this._writable;
      }
    };
    Object.defineProperties(TransformStream.prototype, {
      readable: { enumerable: true },
      writable: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStream",
        configurable: true
      });
    }
    TransformStreamDefaultController = class {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("desiredSize");
        }
        const readableController = this._controlledTransformStream._readable._readableStreamController;
        return ReadableStreamDefaultControllerGetDesiredSize(readableController);
      }
      enqueue(chunk = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("enqueue");
        }
        TransformStreamDefaultControllerEnqueue(this, chunk);
      }
      error(reason = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("error");
        }
        TransformStreamDefaultControllerError(this, reason);
      }
      terminate() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("terminate");
        }
        TransformStreamDefaultControllerTerminate(this);
      }
    };
    Object.defineProperties(TransformStreamDefaultController.prototype, {
      enqueue: { enumerable: true },
      error: { enumerable: true },
      terminate: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStreamDefaultController",
        configurable: true
      });
    }
  }
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/index.js
import http2 from "http";
import https from "https";
import zlib from "zlib";
import Stream2, { PassThrough as PassThrough2, pipeline as pump } from "stream";
import { Buffer as Buffer3 } from "buffer";

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/data-uri-to-buffer-npm-4.0.0-e7a49f58f7-a010653869.zip/node_modules/data-uri-to-buffer/dist/index.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var dist_default = dataUriToBuffer;

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/body.js
init_fetch_blob();
init_esm_min();
import Stream, { PassThrough } from "stream";
import { types, deprecate, promisify } from "util";
import { Buffer as Buffer2 } from "buffer";

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/errors/base.js
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/errors/fetch-error.js
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/utils/is.js
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
var isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
var isDomainOrSubdomain = (destination, original) => {
  const orig = new URL(original).hostname;
  const dest = new URL(destination).hostname;
  return orig === dest || orig.endsWith(`.${dest}`);
};
var isSameProtocol = (destination, original) => {
  const orig = new URL(original).protocol;
  const dest = new URL(destination).protocol;
  return orig === dest;
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/body.js
var pipeline = promisify(Stream.pipeline);
var INTERNALS = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer2.from(body.toString());
    } else if (isBlob(body)) {
    } else if (Buffer2.isBuffer(body)) {
    } else if (types.isAnyArrayBuffer(body)) {
      body = Buffer2.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer2.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream) {
    } else if (body instanceof FormData) {
      body = formDataToBlob(body);
      boundary = body.type.split("=")[1];
    } else {
      body = Buffer2.from(String(body));
    }
    let stream = body;
    if (Buffer2.isBuffer(body)) {
      stream = Stream.Readable.from(body);
    } else if (isBlob(body)) {
      stream = Stream.Readable.from(body.stream());
    }
    this[INTERNALS] = {
      body,
      stream,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof Stream) {
      body.on("error", (error_) => {
        const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS].error = error;
      });
    }
  }
  get body() {
    return this[INTERNALS].stream;
  }
  get bodyUsed() {
    return this[INTERNALS].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async formData() {
    const ct = this.headers.get("content-type");
    if (ct.startsWith("application/x-www-form-urlencoded")) {
      const formData = new FormData();
      const parameters = new URLSearchParams(await this.text());
      for (const [name, value] of parameters) {
        formData.append(name, value);
      }
      return formData;
    }
    const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
    return toFormData2(this.body, ct);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS].body && this[INTERNALS].body.type || "";
    const buf = await this.arrayBuffer();
    return new fetch_blob_default([buf], {
      type: ct
    });
  }
  async json() {
    const text = await this.text();
    return JSON.parse(text);
  }
  async text() {
    const buffer = await consumeBody(this);
    return new TextDecoder().decode(buffer);
  }
  buffer() {
    return consumeBody(this);
  }
};
Body.prototype.buffer = deprecate(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true },
  data: { get: deprecate(
    () => {
    },
    "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
    "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
  ) }
});
async function consumeBody(data) {
  if (data[INTERNALS].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS].disturbed = true;
  if (data[INTERNALS].error) {
    throw data[INTERNALS].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer2.alloc(0);
  }
  if (!(body instanceof Stream)) {
    return Buffer2.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer2.from(accum.join(""));
      }
      return Buffer2.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance[INTERNALS];
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof Stream && typeof body.getBoundary !== "function") {
    p1 = new PassThrough({ highWaterMark });
    p2 = new PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS].stream = p1;
    body = p2;
  }
  return body;
};
var getNonSpecFormDataBoundary = deprecate(
  (body) => body.getBoundary(),
  "form-data doesn't follow the spec and requires special treatment. Use alternative package",
  "https://github.com/node-fetch/node-fetch/issues/1167"
);
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer2.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body instanceof FormData) {
    return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
  }
  if (body instanceof Stream) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request[INTERNALS];
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer2.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  return null;
};
var writeToStream = async (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else {
    await pipeline(body, dest);
  }
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/headers.js
import { types as types2 } from "util";
import http from "http";
var validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error;
  }
};
var validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
    throw error;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init) {
    let result = [];
    if (init instanceof Headers) {
      const raw = init.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init == null) {
    } else if (typeof init === "object" && !types2.isBoxedPrimitive(init)) {
      const method = init[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init].map((pair) => {
          if (typeof pair !== "object" || types2.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase(),
                String(value)
              );
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase()
              );
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(
  Headers.prototype,
  ["get", "entries", "forEach", "values"].reduce((result, property) => {
    result[property] = { enumerable: true };
    return result;
  }, {})
);
function fromRawHeaders(headers = []) {
  return new Headers(
    headers.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []).filter(([name, value]) => {
      try {
        validateHeaderName(name);
        validateHeaderValue(name, String(value));
        return true;
      } catch {
        return false;
      }
    })
  );
}

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/response.js
var INTERNALS2 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options = {}) {
    super(body, options);
    const status = options.status != null ? options.status : 200;
    const headers = new Headers(options.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS2] = {
      type: "default",
      url: options.url,
      status,
      statusText: options.statusText || "",
      headers,
      counter: options.counter,
      highWaterMark: options.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS2].type;
  }
  get url() {
    return this[INTERNALS2].url || "";
  }
  get status() {
    return this[INTERNALS2].status;
  }
  get ok() {
    return this[INTERNALS2].status >= 200 && this[INTERNALS2].status < 300;
  }
  get redirected() {
    return this[INTERNALS2].counter > 0;
  }
  get statusText() {
    return this[INTERNALS2].statusText;
  }
  get headers() {
    return this[INTERNALS2].headers;
  }
  get highWaterMark() {
    return this[INTERNALS2].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size,
      highWaterMark: this.highWaterMark
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response2(null, { status: 0, statusText: "" });
    response[INTERNALS2].type = "error";
    return response;
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/request.js
import { format as formatUrl } from "url";
import { deprecate as deprecate2 } from "util";

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/utils/get-search.js
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/utils/referrer.js
import { isIP } from "net";
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
var ReferrerPolicy = /* @__PURE__ */ new Set([
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
]);
var DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = isIP(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/request.js
var INTERNALS3 = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS3] === "object";
};
var doBadDataWarn = deprecate2(
  () => {
  },
  ".data is not a valid RequestInit property, use .body instead",
  "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
);
var Request2 = class extends Body {
  constructor(input, init = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    if (parsedURL.username !== "" || parsedURL.password !== "") {
      throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
    }
    let method = init.method || input.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(method)) {
      method = method.toUpperCase();
    }
    if (!isRequest(init) && "data" in init) {
      doBadDataWarn();
    }
    if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init.size || input.size || 0
    });
    const headers = new Headers(init.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.set("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init) {
      signal = init.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    let referrer = init.referrer == null ? input.referrer : init.referrer;
    if (referrer === "") {
      referrer = "no-referrer";
    } else if (referrer) {
      const parsedReferrer = new URL(referrer);
      referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
    } else {
      referrer = void 0;
    }
    this[INTERNALS3] = {
      method,
      redirect: init.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal,
      referrer
    };
    this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
    this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
    this.counter = init.counter || input.counter || 0;
    this.agent = init.agent || input.agent;
    this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
    this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
  }
  get method() {
    return this[INTERNALS3].method;
  }
  get url() {
    return formatUrl(this[INTERNALS3].parsedURL);
  }
  get headers() {
    return this[INTERNALS3].headers;
  }
  get redirect() {
    return this[INTERNALS3].redirect;
  }
  get signal() {
    return this[INTERNALS3].signal;
  }
  get referrer() {
    if (this[INTERNALS3].referrer === "no-referrer") {
      return "";
    }
    if (this[INTERNALS3].referrer === "client") {
      return "about:client";
    }
    if (this[INTERNALS3].referrer) {
      return this[INTERNALS3].referrer.toString();
    }
    return void 0;
  }
  get referrerPolicy() {
    return this[INTERNALS3].referrerPolicy;
  }
  set referrerPolicy(referrerPolicy) {
    this[INTERNALS3].referrerPolicy = validateReferrerPolicy(referrerPolicy);
  }
  clone() {
    return new Request2(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request2.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true },
  referrer: { enumerable: true },
  referrerPolicy: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS3];
  const headers = new Headers(request[INTERNALS3].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (request.referrerPolicy === "") {
    request.referrerPolicy = DEFAULT_REFERRER_POLICY;
  }
  if (request.referrer && request.referrer !== "no-referrer") {
    request[INTERNALS3].referrer = determineRequestsReferrer(request);
  } else {
    request[INTERNALS3].referrer = "no-referrer";
  }
  if (request[INTERNALS3].referrer instanceof URL) {
    headers.set("Referer", request.referrer);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip, deflate, br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const options = {
    path: parsedURL.pathname + search,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return {
    parsedURL,
    options
  };
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/errors/abort-error.js
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/node-fetch-npm-3.2.10-b87c28708a-e65322431f.zip/node_modules/node-fetch/src/index.js
init_esm_min();
init_from();
var supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? https : http2).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof Stream2.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream2.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve(fetch(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pump(response_, new PassThrough2(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pump(body, zlib.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response2(body, responseOptions);
        resolve(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pump(response_, new PassThrough2(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = pump(body, zlib.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = pump(body, zlib.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response2(body, responseOptions);
          resolve(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response2(body, responseOptions);
            resolve(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = pump(body, zlib.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response2(body, responseOptions);
        resolve(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer3.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = Buffer3.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer3.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer3.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/event-target-shim-npm-5.0.1-cb48709025-1ffe3bb22a.zip/node_modules/event-target-shim/dist/event-target-shim.mjs
var privateData = /* @__PURE__ */ new WeakMap();
var wrappers = /* @__PURE__ */ new WeakMap();
function pd(event) {
  const retv = privateData.get(event);
  console.assert(
    retv != null,
    "'this' is expected an Event object, but got",
    event
  );
  return retv;
}
function setCancelFlag(data) {
  if (data.passiveListener != null) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "Unable to preventDefault inside passive event listener invocation.",
        data.passiveListener
      );
    }
    return;
  }
  if (!data.event.cancelable) {
    return;
  }
  data.canceled = true;
  if (typeof data.event.preventDefault === "function") {
    data.event.preventDefault();
  }
}
function Event(eventTarget, event) {
  privateData.set(this, {
    eventTarget,
    event,
    eventPhase: 2,
    currentTarget: eventTarget,
    canceled: false,
    stopped: false,
    immediateStopped: false,
    passiveListener: null,
    timeStamp: event.timeStamp || Date.now()
  });
  Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });
  const keys = Object.keys(event);
  for (let i2 = 0; i2 < keys.length; ++i2) {
    const key = keys[i2];
    if (!(key in this)) {
      Object.defineProperty(this, key, defineRedirectDescriptor(key));
    }
  }
}
Event.prototype = {
  get type() {
    return pd(this).event.type;
  },
  get target() {
    return pd(this).eventTarget;
  },
  get currentTarget() {
    return pd(this).currentTarget;
  },
  composedPath() {
    const currentTarget = pd(this).currentTarget;
    if (currentTarget == null) {
      return [];
    }
    return [currentTarget];
  },
  get NONE() {
    return 0;
  },
  get CAPTURING_PHASE() {
    return 1;
  },
  get AT_TARGET() {
    return 2;
  },
  get BUBBLING_PHASE() {
    return 3;
  },
  get eventPhase() {
    return pd(this).eventPhase;
  },
  stopPropagation() {
    const data = pd(this);
    data.stopped = true;
    if (typeof data.event.stopPropagation === "function") {
      data.event.stopPropagation();
    }
  },
  stopImmediatePropagation() {
    const data = pd(this);
    data.stopped = true;
    data.immediateStopped = true;
    if (typeof data.event.stopImmediatePropagation === "function") {
      data.event.stopImmediatePropagation();
    }
  },
  get bubbles() {
    return Boolean(pd(this).event.bubbles);
  },
  get cancelable() {
    return Boolean(pd(this).event.cancelable);
  },
  preventDefault() {
    setCancelFlag(pd(this));
  },
  get defaultPrevented() {
    return pd(this).canceled;
  },
  get composed() {
    return Boolean(pd(this).event.composed);
  },
  get timeStamp() {
    return pd(this).timeStamp;
  },
  get srcElement() {
    return pd(this).eventTarget;
  },
  get cancelBubble() {
    return pd(this).stopped;
  },
  set cancelBubble(value) {
    if (!value) {
      return;
    }
    const data = pd(this);
    data.stopped = true;
    if (typeof data.event.cancelBubble === "boolean") {
      data.event.cancelBubble = true;
    }
  },
  get returnValue() {
    return !pd(this).canceled;
  },
  set returnValue(value) {
    if (!value) {
      setCancelFlag(pd(this));
    }
  },
  initEvent() {
  }
};
Object.defineProperty(Event.prototype, "constructor", {
  value: Event,
  configurable: true,
  writable: true
});
if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
  Object.setPrototypeOf(Event.prototype, window.Event.prototype);
  wrappers.set(window.Event.prototype, Event);
}
function defineRedirectDescriptor(key) {
  return {
    get() {
      return pd(this).event[key];
    },
    set(value) {
      pd(this).event[key] = value;
    },
    configurable: true,
    enumerable: true
  };
}
function defineCallDescriptor(key) {
  return {
    value() {
      const event = pd(this).event;
      return event[key].apply(event, arguments);
    },
    configurable: true,
    enumerable: true
  };
}
function defineWrapper(BaseEvent, proto) {
  const keys = Object.keys(proto);
  if (keys.length === 0) {
    return BaseEvent;
  }
  function CustomEvent(eventTarget, event) {
    BaseEvent.call(this, eventTarget, event);
  }
  CustomEvent.prototype = Object.create(BaseEvent.prototype, {
    constructor: { value: CustomEvent, configurable: true, writable: true }
  });
  for (let i2 = 0; i2 < keys.length; ++i2) {
    const key = keys[i2];
    if (!(key in BaseEvent.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);
      const isFunc = typeof descriptor.value === "function";
      Object.defineProperty(
        CustomEvent.prototype,
        key,
        isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key)
      );
    }
  }
  return CustomEvent;
}
function getWrapper(proto) {
  if (proto == null || proto === Object.prototype) {
    return Event;
  }
  let wrapper = wrappers.get(proto);
  if (wrapper == null) {
    wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
    wrappers.set(proto, wrapper);
  }
  return wrapper;
}
function wrapEvent(eventTarget, event) {
  const Wrapper = getWrapper(Object.getPrototypeOf(event));
  return new Wrapper(eventTarget, event);
}
function isStopped(event) {
  return pd(event).immediateStopped;
}
function setEventPhase(event, eventPhase) {
  pd(event).eventPhase = eventPhase;
}
function setCurrentTarget(event, currentTarget) {
  pd(event).currentTarget = currentTarget;
}
function setPassiveListener(event, passiveListener) {
  pd(event).passiveListener = passiveListener;
}
var listenersMap = /* @__PURE__ */ new WeakMap();
var CAPTURE = 1;
var BUBBLE = 2;
var ATTRIBUTE = 3;
function isObject(x2) {
  return x2 !== null && typeof x2 === "object";
}
function getListeners(eventTarget) {
  const listeners = listenersMap.get(eventTarget);
  if (listeners == null) {
    throw new TypeError(
      "'this' is expected an EventTarget object, but got another value."
    );
  }
  return listeners;
}
function defineEventAttributeDescriptor(eventName) {
  return {
    get() {
      const listeners = getListeners(this);
      let node = listeners.get(eventName);
      while (node != null) {
        if (node.listenerType === ATTRIBUTE) {
          return node.listener;
        }
        node = node.next;
      }
      return null;
    },
    set(listener) {
      if (typeof listener !== "function" && !isObject(listener)) {
        listener = null;
      }
      const listeners = getListeners(this);
      let prev = null;
      let node = listeners.get(eventName);
      while (node != null) {
        if (node.listenerType === ATTRIBUTE) {
          if (prev !== null) {
            prev.next = node.next;
          } else if (node.next !== null) {
            listeners.set(eventName, node.next);
          } else {
            listeners.delete(eventName);
          }
        } else {
          prev = node;
        }
        node = node.next;
      }
      if (listener !== null) {
        const newNode = {
          listener,
          listenerType: ATTRIBUTE,
          passive: false,
          once: false,
          next: null
        };
        if (prev === null) {
          listeners.set(eventName, newNode);
        } else {
          prev.next = newNode;
        }
      }
    },
    configurable: true,
    enumerable: true
  };
}
function defineEventAttribute(eventTargetPrototype, eventName) {
  Object.defineProperty(
    eventTargetPrototype,
    `on${eventName}`,
    defineEventAttributeDescriptor(eventName)
  );
}
function defineCustomEventTarget(eventNames) {
  function CustomEventTarget() {
    EventTarget.call(this);
  }
  CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
    constructor: {
      value: CustomEventTarget,
      configurable: true,
      writable: true
    }
  });
  for (let i2 = 0; i2 < eventNames.length; ++i2) {
    defineEventAttribute(CustomEventTarget.prototype, eventNames[i2]);
  }
  return CustomEventTarget;
}
function EventTarget() {
  if (this instanceof EventTarget) {
    listenersMap.set(this, /* @__PURE__ */ new Map());
    return;
  }
  if (arguments.length === 1 && Array.isArray(arguments[0])) {
    return defineCustomEventTarget(arguments[0]);
  }
  if (arguments.length > 0) {
    const types3 = new Array(arguments.length);
    for (let i2 = 0; i2 < arguments.length; ++i2) {
      types3[i2] = arguments[i2];
    }
    return defineCustomEventTarget(types3);
  }
  throw new TypeError("Cannot call a class as a function");
}
EventTarget.prototype = {
  addEventListener(eventName, listener, options) {
    if (listener == null) {
      return;
    }
    if (typeof listener !== "function" && !isObject(listener)) {
      throw new TypeError("'listener' should be a function or an object.");
    }
    const listeners = getListeners(this);
    const optionsIsObj = isObject(options);
    const capture = optionsIsObj ? Boolean(options.capture) : Boolean(options);
    const listenerType = capture ? CAPTURE : BUBBLE;
    const newNode = {
      listener,
      listenerType,
      passive: optionsIsObj && Boolean(options.passive),
      once: optionsIsObj && Boolean(options.once),
      next: null
    };
    let node = listeners.get(eventName);
    if (node === void 0) {
      listeners.set(eventName, newNode);
      return;
    }
    let prev = null;
    while (node != null) {
      if (node.listener === listener && node.listenerType === listenerType) {
        return;
      }
      prev = node;
      node = node.next;
    }
    prev.next = newNode;
  },
  removeEventListener(eventName, listener, options) {
    if (listener == null) {
      return;
    }
    const listeners = getListeners(this);
    const capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
    const listenerType = capture ? CAPTURE : BUBBLE;
    let prev = null;
    let node = listeners.get(eventName);
    while (node != null) {
      if (node.listener === listener && node.listenerType === listenerType) {
        if (prev !== null) {
          prev.next = node.next;
        } else if (node.next !== null) {
          listeners.set(eventName, node.next);
        } else {
          listeners.delete(eventName);
        }
        return;
      }
      prev = node;
      node = node.next;
    }
  },
  dispatchEvent(event) {
    if (event == null || typeof event.type !== "string") {
      throw new TypeError('"event.type" should be a string.');
    }
    const listeners = getListeners(this);
    const eventName = event.type;
    let node = listeners.get(eventName);
    if (node == null) {
      return true;
    }
    const wrappedEvent = wrapEvent(this, event);
    let prev = null;
    while (node != null) {
      if (node.once) {
        if (prev !== null) {
          prev.next = node.next;
        } else if (node.next !== null) {
          listeners.set(eventName, node.next);
        } else {
          listeners.delete(eventName);
        }
      } else {
        prev = node;
      }
      setPassiveListener(
        wrappedEvent,
        node.passive ? node.listener : null
      );
      if (typeof node.listener === "function") {
        try {
          node.listener.call(this, wrappedEvent);
        } catch (err) {
          if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error(err);
          }
        }
      } else if (node.listenerType !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
        node.listener.handleEvent(wrappedEvent);
      }
      if (isStopped(wrappedEvent)) {
        break;
      }
      node = node.next;
    }
    setPassiveListener(wrappedEvent, null);
    setEventPhase(wrappedEvent, 0);
    setCurrentTarget(wrappedEvent, null);
    return !wrappedEvent.defaultPrevented;
  }
};
Object.defineProperty(EventTarget.prototype, "constructor", {
  value: EventTarget,
  configurable: true,
  writable: true
});
if (typeof window !== "undefined" && typeof window.EventTarget !== "undefined") {
  Object.setPrototypeOf(EventTarget.prototype, window.EventTarget.prototype);
}

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/abort-controller-npm-3.0.0-2f3a9a2bcb-170bdba9b4.zip/node_modules/abort-controller/dist/abort-controller.mjs
var AbortSignal = class extends EventTarget {
  constructor() {
    super();
    throw new TypeError("AbortSignal cannot be constructed directly");
  }
  get aborted() {
    const aborted = abortedFlags.get(this);
    if (typeof aborted !== "boolean") {
      throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
    }
    return aborted;
  }
};
defineEventAttribute(AbortSignal.prototype, "abort");
function createAbortSignal() {
  const signal = Object.create(AbortSignal.prototype);
  EventTarget.call(signal);
  abortedFlags.set(signal, false);
  return signal;
}
function abortSignal(signal) {
  if (abortedFlags.get(signal) !== false) {
    return;
  }
  abortedFlags.set(signal, true);
  signal.dispatchEvent({ type: "abort" });
}
var abortedFlags = /* @__PURE__ */ new WeakMap();
Object.defineProperties(AbortSignal.prototype, {
  aborted: { enumerable: true }
});
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
  Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
    configurable: true,
    value: "AbortSignal"
  });
}
var AbortController2 = class {
  constructor() {
    signals.set(this, createAbortSignal());
  }
  get signal() {
    return getSignal(this);
  }
  abort() {
    abortSignal(getSignal(this));
  }
};
var signals = /* @__PURE__ */ new WeakMap();
function getSignal(controller) {
  const signal = signals.get(controller);
  if (signal == null) {
    throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`);
  }
  return signal;
}
Object.defineProperties(AbortController2.prototype, {
  signal: { enumerable: true },
  abort: { enumerable: true }
});
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
  Object.defineProperty(AbortController2.prototype, Symbol.toStringTag, {
    configurable: true,
    value: "AbortController"
  });
}
var abort_controller_default = AbortController2;

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/ky-npm-0.31.1-56fdc94d48-c1ca2c60ba.zip/node_modules/ky/distribution/errors/HTTPError.js
var HTTPError = class extends Error {
  constructor(response, request, options) {
    const code = response.status || response.status === 0 ? response.status : "";
    const title = response.statusText || "";
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : "an unknown error";
    super(`Request failed with ${reason}`);
    Object.defineProperty(this, "response", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "request", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "options", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.name = "HTTPError";
    this.response = response;
    this.request = request;
    this.options = options;
  }
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/ky-npm-0.31.1-56fdc94d48-c1ca2c60ba.zip/node_modules/ky/distribution/errors/TimeoutError.js
var TimeoutError = class extends Error {
  constructor(request) {
    super("Request timed out");
    Object.defineProperty(this, "request", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.name = "TimeoutError";
    this.request = request;
  }
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/ky-npm-0.31.1-56fdc94d48-c1ca2c60ba.zip/node_modules/ky/distribution/utils/is.js
var isObject2 = (value) => value !== null && typeof value === "object";

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/ky-npm-0.31.1-56fdc94d48-c1ca2c60ba.zip/node_modules/ky/distribution/utils/merge.js
var validateAndMerge = (...sources) => {
  for (const source of sources) {
    if ((!isObject2(source) || Array.isArray(source)) && typeof source !== "undefined") {
      throw new TypeError("The `options` argument must be an object");
    }
  }
  return deepMerge({}, ...sources);
};
var mergeHeaders = (source1 = {}, source2 = {}) => {
  const result = new globalThis.Headers(source1);
  const isHeadersInstance = source2 instanceof globalThis.Headers;
  const source = new globalThis.Headers(source2);
  for (const [key, value] of source.entries()) {
    if (isHeadersInstance && value === "undefined" || value === void 0) {
      result.delete(key);
    } else {
      result.set(key, value);
    }
  }
  return result;
};
var deepMerge = (...sources) => {
  let returnValue = {};
  let headers = {};
  for (const source of sources) {
    if (Array.isArray(source)) {
      if (!Array.isArray(returnValue)) {
        returnValue = [];
      }
      returnValue = [...returnValue, ...source];
    } else if (isObject2(source)) {
      for (let [key, value] of Object.entries(source)) {
        if (isObject2(value) && key in returnValue) {
          value = deepMerge(returnValue[key], value);
        }
        returnValue = { ...returnValue, [key]: value };
      }
      if (isObject2(source.headers)) {
        headers = mergeHeaders(headers, source.headers);
        returnValue.headers = headers;
      }
    }
  }
  return returnValue;
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/ky-npm-0.31.1-56fdc94d48-c1ca2c60ba.zip/node_modules/ky/distribution/core/constants.js
var supportsAbortController = typeof globalThis.AbortController === "function";
var supportsStreams = typeof globalThis.ReadableStream === "function";
var supportsFormData = typeof globalThis.FormData === "function";
var requestMethods = ["get", "post", "put", "patch", "head", "delete"];
var validate = () => void 0;
validate();
var responseTypes = {
  json: "application/json",
  text: "text/*",
  formData: "multipart/form-data",
  arrayBuffer: "*/*",
  blob: "*/*"
};
var maxSafeTimeout = 2147483647;
var stop = Symbol("stop");

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/ky-npm-0.31.1-56fdc94d48-c1ca2c60ba.zip/node_modules/ky/distribution/utils/normalize.js
var normalizeRequestMethod = (input) => requestMethods.includes(input) ? input.toUpperCase() : input;
var retryMethods = ["get", "put", "head", "delete", "options", "trace"];
var retryStatusCodes = [408, 413, 429, 500, 502, 503, 504];
var retryAfterStatusCodes = [413, 429, 503];
var defaultRetryOptions = {
  limit: 2,
  methods: retryMethods,
  statusCodes: retryStatusCodes,
  afterStatusCodes: retryAfterStatusCodes,
  maxRetryAfter: Number.POSITIVE_INFINITY
};
var normalizeRetryOptions = (retry = {}) => {
  if (typeof retry === "number") {
    return {
      ...defaultRetryOptions,
      limit: retry
    };
  }
  if (retry.methods && !Array.isArray(retry.methods)) {
    throw new Error("retry.methods must be an array");
  }
  if (retry.statusCodes && !Array.isArray(retry.statusCodes)) {
    throw new Error("retry.statusCodes must be an array");
  }
  return {
    ...defaultRetryOptions,
    ...retry,
    afterStatusCodes: retryAfterStatusCodes
  };
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/ky-npm-0.31.1-56fdc94d48-c1ca2c60ba.zip/node_modules/ky/distribution/utils/time.js
var timeout = async (request, abortController, options) => new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    if (abortController) {
      abortController.abort();
    }
    reject(new TimeoutError(request));
  }, options.timeout);
  void options.fetch(request).then(resolve).catch(reject).then(() => {
    clearTimeout(timeoutId);
  });
});
var delay = async (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/ky-npm-0.31.1-56fdc94d48-c1ca2c60ba.zip/node_modules/ky/distribution/core/Ky.js
var Ky = class {
  constructor(input, options = {}) {
    Object.defineProperty(this, "request", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "abortController", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_retryCount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_input", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_options", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this._input = input;
    this._options = {
      credentials: this._input.credentials || "same-origin",
      ...options,
      headers: mergeHeaders(this._input.headers, options.headers),
      hooks: deepMerge({
        beforeRequest: [],
        beforeRetry: [],
        beforeError: [],
        afterResponse: []
      }, options.hooks),
      method: normalizeRequestMethod(options.method ?? this._input.method),
      prefixUrl: String(options.prefixUrl || ""),
      retry: normalizeRetryOptions(options.retry),
      throwHttpErrors: options.throwHttpErrors !== false,
      timeout: typeof options.timeout === "undefined" ? 1e4 : options.timeout,
      fetch: options.fetch ?? globalThis.fetch.bind(globalThis)
    };
    if (typeof this._input !== "string" && !(this._input instanceof URL || this._input instanceof globalThis.Request)) {
      throw new TypeError("`input` must be a string, URL, or Request");
    }
    if (this._options.prefixUrl && typeof this._input === "string") {
      if (this._input.startsWith("/")) {
        throw new Error("`input` must not begin with a slash when using `prefixUrl`");
      }
      if (!this._options.prefixUrl.endsWith("/")) {
        this._options.prefixUrl += "/";
      }
      this._input = this._options.prefixUrl + this._input;
    }
    if (supportsAbortController) {
      this.abortController = new globalThis.AbortController();
      if (this._options.signal) {
        this._options.signal.addEventListener("abort", () => {
          this.abortController.abort();
        });
      }
      this._options.signal = this.abortController.signal;
    }
    this.request = new globalThis.Request(this._input, this._options);
    if (this._options.searchParams) {
      const textSearchParams = typeof this._options.searchParams === "string" ? this._options.searchParams.replace(/^\?/, "") : new URLSearchParams(this._options.searchParams).toString();
      const searchParams = "?" + textSearchParams;
      const url = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, searchParams);
      if ((supportsFormData && this._options.body instanceof globalThis.FormData || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers["content-type"])) {
        this.request.headers.delete("content-type");
      }
      this.request = new globalThis.Request(new globalThis.Request(url, this.request), this._options);
    }
    if (this._options.json !== void 0) {
      this._options.body = JSON.stringify(this._options.json);
      this.request.headers.set("content-type", this._options.headers.get("content-type") ?? "application/json");
      this.request = new globalThis.Request(this.request, { body: this._options.body });
    }
  }
  static create(input, options) {
    const ky2 = new Ky(input, options);
    const fn = async () => {
      if (ky2._options.timeout > maxSafeTimeout) {
        throw new RangeError(`The \`timeout\` option cannot be greater than ${maxSafeTimeout}`);
      }
      await Promise.resolve();
      let response = await ky2._fetch();
      for (const hook of ky2._options.hooks.afterResponse) {
        const modifiedResponse = await hook(ky2.request, ky2._options, ky2._decorateResponse(response.clone()));
        if (modifiedResponse instanceof globalThis.Response) {
          response = modifiedResponse;
        }
      }
      ky2._decorateResponse(response);
      if (!response.ok && ky2._options.throwHttpErrors) {
        let error = new HTTPError(response, ky2.request, ky2._options);
        for (const hook of ky2._options.hooks.beforeError) {
          error = await hook(error);
        }
        throw error;
      }
      if (ky2._options.onDownloadProgress) {
        if (typeof ky2._options.onDownloadProgress !== "function") {
          throw new TypeError("The `onDownloadProgress` option must be a function");
        }
        if (!supportsStreams) {
          throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");
        }
        return ky2._stream(response.clone(), ky2._options.onDownloadProgress);
      }
      return response;
    };
    const isRetriableMethod = ky2._options.retry.methods.includes(ky2.request.method.toLowerCase());
    const result = isRetriableMethod ? ky2._retry(fn) : fn();
    for (const [type, mimeType] of Object.entries(responseTypes)) {
      result[type] = async () => {
        ky2.request.headers.set("accept", ky2.request.headers.get("accept") || mimeType);
        const awaitedResult = await result;
        const response = awaitedResult.clone();
        if (type === "json") {
          if (response.status === 204) {
            return "";
          }
          if (options.parseJson) {
            return options.parseJson(await response.text());
          }
        }
        return response[type]();
      };
    }
    return result;
  }
  _calculateRetryDelay(error) {
    this._retryCount++;
    if (this._retryCount < this._options.retry.limit && !(error instanceof TimeoutError)) {
      if (error instanceof HTTPError) {
        if (!this._options.retry.statusCodes.includes(error.response.status)) {
          return 0;
        }
        const retryAfter = error.response.headers.get("Retry-After");
        if (retryAfter && this._options.retry.afterStatusCodes.includes(error.response.status)) {
          let after = Number(retryAfter);
          if (Number.isNaN(after)) {
            after = Date.parse(retryAfter) - Date.now();
          } else {
            after *= 1e3;
          }
          if (typeof this._options.retry.maxRetryAfter !== "undefined" && after > this._options.retry.maxRetryAfter) {
            return 0;
          }
          return after;
        }
        if (error.response.status === 413) {
          return 0;
        }
      }
      const BACKOFF_FACTOR = 0.3;
      return BACKOFF_FACTOR * 2 ** (this._retryCount - 1) * 1e3;
    }
    return 0;
  }
  _decorateResponse(response) {
    if (this._options.parseJson) {
      response.json = async () => this._options.parseJson(await response.text());
    }
    return response;
  }
  async _retry(fn) {
    try {
      return await fn();
    } catch (error) {
      const ms = Math.min(this._calculateRetryDelay(error), maxSafeTimeout);
      if (ms !== 0 && this._retryCount > 0) {
        await delay(ms);
        for (const hook of this._options.hooks.beforeRetry) {
          const hookResult = await hook({
            request: this.request,
            options: this._options,
            error,
            retryCount: this._retryCount
          });
          if (hookResult === stop) {
            return;
          }
        }
        return this._retry(fn);
      }
      throw error;
    }
  }
  async _fetch() {
    for (const hook of this._options.hooks.beforeRequest) {
      const result = await hook(this.request, this._options);
      if (result instanceof Request) {
        this.request = result;
        break;
      }
      if (result instanceof Response) {
        return result;
      }
    }
    if (this._options.timeout === false) {
      return this._options.fetch(this.request.clone());
    }
    return timeout(this.request.clone(), this.abortController, this._options);
  }
  _stream(response, onDownloadProgress) {
    const totalBytes = Number(response.headers.get("content-length")) || 0;
    let transferredBytes = 0;
    if (response.status === 204) {
      if (onDownloadProgress) {
        onDownloadProgress({ percent: 1, totalBytes, transferredBytes }, new Uint8Array());
      }
      return new globalThis.Response(null, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    }
    return new globalThis.Response(new globalThis.ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        if (onDownloadProgress) {
          onDownloadProgress({ percent: 0, transferredBytes: 0, totalBytes }, new Uint8Array());
        }
        async function read() {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }
          if (onDownloadProgress) {
            transferredBytes += value.byteLength;
            const percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes;
            onDownloadProgress({ percent, transferredBytes, totalBytes }, value);
          }
          controller.enqueue(value);
          await read();
        }
        await read();
      }
    }), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }
};

// pnp:/Users/raon0211/dev/toss-frontend-libraries/.yarn/cache/ky-npm-0.31.1-56fdc94d48-c1ca2c60ba.zip/node_modules/ky/distribution/index.js
var createInstance = (defaults) => {
  const ky2 = (input, options) => Ky.create(input, validateAndMerge(defaults, options));
  for (const method of requestMethods) {
    ky2[method] = (input, options) => Ky.create(input, validateAndMerge(defaults, options, { method }));
  }
  ky2.create = (newDefaults) => createInstance(validateAndMerge(newDefaults));
  ky2.extend = (newDefaults) => createInstance(validateAndMerge(defaults, newDefaults));
  ky2.stop = stop;
  return ky2;
};
var ky = createInstance();
var distribution_default = ky;

// pnp:/Users/raon0211/dev/toss-frontend-libraries/packages/ky/src/index.server.ts
var TEN_MEGABYTES = 1e3 * 1e3 * 10;
if (!globalThis.fetch) {
  globalThis.fetch = (url, options) => fetch(url, { highWaterMark: TEN_MEGABYTES, ...options });
}
if (!globalThis.Headers) {
  globalThis.Headers = Headers;
}
if (!globalThis.Request) {
  globalThis.Request = Request2;
}
if (!globalThis.Response) {
  globalThis.Response = Response2;
}
if (!globalThis.AbortController) {
  globalThis.AbortController = abort_controller_default;
}
if (!globalThis.ReadableStream) {
  globalThis.ReadableStream = (init_ponyfill_es6(), __toCommonJS(ponyfill_es6_exports));
}
var index_server_default = distribution_default;
export {
  HTTPError,
  TimeoutError,
  index_server_default as default
};
/*! MIT License © Sindre Sorhus */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
