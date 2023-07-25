export interface BaseRedirectionOptions {
  destination: string;
  external?: boolean;
}

export type RedirectionOptions<T extends BaseRedirectionOptions = BaseRedirectionOptions> = T;

export class Redirection<T extends BaseRedirectionOptions = BaseRedirectionOptions> extends Error {
  readonly name = 'Redirection';
  readonly options: RedirectionOptions<T>;

  static of<T extends Redirection<K>, K extends BaseRedirectionOptions>(
    this: StaticThis<T, K>,
    options: RedirectionOptions<K>
  ) {
    return new this(options);
  }

  static isRedirection<T extends BaseRedirectionOptions = BaseRedirectionOptions>(
    data: unknown
  ): data is Redirection<T> {
    return data != null && (data as any)?.name === 'Redirection';
  }

  constructor(options: RedirectionOptions<T>) {
    super(`Redirection to ${options.destination}`);
    this.options = options;
  }
}

export function isRedirection<T extends BaseRedirectionOptions = BaseRedirectionOptions>(
  data: unknown
): data is Redirection<T> {
  return data != null && (data as any)?.name === 'Redirection';
}

type StaticThis<T, K> = { new (args: K): T };
