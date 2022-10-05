/** @tossdocs-ignore */
interface OptionalConstructor<T> {
  readonly value: T | undefined;
  flatMap<U>(flatMapper: (originalVal: T) => Optional<U>): Optional<U>;
}

const $$isOptional = Symbol.for('Optional');

declare global {
  interface Optional<T> {
    flatMap: OptionalConstructor<T>['flatMap'];
    case<U>(cases: { Some: (value: T) => U; None: () => U }): U;
    map<U>(mapper: (originalVal: T) => U): Optional<U>;
    filter(isJustPredicate: (value: T) => boolean): Optional<T>;
    orElse<U>(that: Optional<U>): U extends T ? Optional<T> : Optional<T | U>;
    getOrElse<U>(defaultVal: U): U extends T ? T : T | U;
    defaultTo<U>(defaultVal: U): U extends T ? T : T | U;
    get(): T;
  }
}

function constructor<T>({ value, flatMap }: OptionalConstructor<T>): Optional<T> {
  function map<U>(mapper: (originalVal: T) => U): Optional<U> {
    return flatMap(originalVal => Some<U>(mapper(originalVal)));
  }

  function filter(isJustPredicate: (value: T) => boolean): Optional<T> {
    return flatMap((originalVal: T) => {
      if (!isJustPredicate(originalVal)) {
        return None<T>();
      }

      return Some<T>(originalVal);
    });
  }

  function get() {
    if (value === undefined) {
      throw new Error('Cannot get from None');
    }

    return value;
  }

  function getOrElse<U>(defaultVal: T | U) {
    if (value === undefined) {
      return defaultVal;
    }

    return value;
  }

  function orElse<U>(that: Optional<T | U>) {
    return map(Some).getOrElse(that);
  }

  return {
    $$isOptional,
    flatMap,
    map,
    filter,
    get,
    getOrElse,
    defaultTo: getOrElse,
    orElse,
    case<U>(cases: { Some: (value: T) => U; None: () => U }): U {
      if (value === undefined) {
        return cases.None();
      }

      return cases.Some(value);
    },
  } as any;
}

/**
 * @deprecated v18에서 제거 예정
 */
export function Some<T>(value: T): Optional<T> {
  function flatMap<U>(flatMapper: (originalVal: T) => Optional<U>) {
    return flatMapper(value);
  }

  return constructor({ value, flatMap });
}

/**
 * @deprecated v18에서 제거 예정
 */
export function None<T>(): Optional<T> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function flatMap<U>(_: (originalVal: T) => Optional<U>) {
    return None<U>();
  }

  return constructor({ value: undefined, flatMap });
}

type Nullable<T> = Optional<T> | T | undefined | null;

type OptionalObject = Readonly<{
  from<T>(value: T | undefined | null): Optional<T>;
  isOptional(value: any): value is Optional<any>;
  all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    xs: [
      Nullable<T1>,
      Nullable<T2>,
      Nullable<T3>,
      Nullable<T4>,
      Nullable<T5>,
      Nullable<T6>,
      Nullable<T7>,
      Nullable<T8>,
      Nullable<T9>,
      Nullable<T10>
    ]
  ): Optional<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
  all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    xs: [
      Nullable<T1>,
      Nullable<T2>,
      Nullable<T3>,
      Nullable<T4>,
      Nullable<T5>,
      Nullable<T6>,
      Nullable<T7>,
      Nullable<T8>,
      Nullable<T9>
    ]
  ): Optional<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
  all<T1, T2, T3, T4, T5, T6, T7, T8>(
    xs: [Nullable<T1>, Nullable<T2>, Nullable<T3>, Nullable<T4>, Nullable<T5>, Nullable<T6>, Nullable<T7>, Nullable<T8>]
  ): Optional<[T1, T2, T3, T4, T5, T6, T7, T8]>;
  all<T1, T2, T3, T4, T5, T6, T7>(
    xs: [Nullable<T1>, Nullable<T2>, Nullable<T3>, Nullable<T4>, Nullable<T5>, Nullable<T6>, Nullable<T7>]
  ): Optional<[T1, T2, T3, T4, T5, T6, T7]>;
  all<T1, T2, T3, T4, T5, T6>(
    xs: [Nullable<T1>, Nullable<T2>, Nullable<T3>, Nullable<T4>, Nullable<T5>, Nullable<T6>]
  ): Optional<[T1, T2, T3, T4, T5, T6]>;
  all<T1, T2, T3, T4, T5>(
    xs: [Nullable<T1>, Nullable<T2>, Nullable<T3>, Nullable<T4>, Nullable<T5>]
  ): Optional<[T1, T2, T3, T4, T5]>;
  all<T1, T2, T3, T4>(xs: [Nullable<T1>, Nullable<T2>, Nullable<T3>, Nullable<T4>]): Optional<[T1, T2, T3, T4]>;
  all<T1, T2, T3>(xs: [Nullable<T1>, Nullable<T2>, Nullable<T3>]): Optional<[T1, T2, T3]>;
  all<T1, T2>(xs: [Nullable<T1>, Nullable<T2>]): Optional<[T1, T2]>;
  all<A>(ts: Array<Nullable<A>>): Optional<A[]>;
}>;

/**
 * @deprecated v18에서 제거 예정
 */
export const Optional: OptionalObject = {
  from: fromValue,
  all: fromAll,
  isOptional,
};

function fromValue<T>(value: T | undefined | null): Optional<T> {
  if (value === undefined || value === null) {
    return None<T>();
  }

  return Some<T>(value);
}

function isOptional(value: any): value is Optional<any> {
  return typeof value === 'object' && '$$isOptional' in value && value.$$isOptional === $$isOptional;
}

function fromAll(optionals: Array<Optional<any>>): any {
  return Optional.from(
    optionals.reduce<any[] | undefined>((acc: any[] | undefined, curr: Nullable<any>) => {
      if (acc === undefined) {
        return undefined;
      }

      if (curr === undefined || curr === null) {
        return undefined;
      }

      if (!Optional.isOptional(curr)) {
        return [...acc, curr];
      }

      return curr.case({
        Some: value => [...acc, value],
        None: () => undefined,
      });
    }, [])
  );
}
