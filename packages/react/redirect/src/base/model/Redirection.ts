/** @tossdocs-ignore */
export interface BaseRedirectionOptions {
  destination: string;
}

export type RedirectionOptions<T extends BaseRedirectionOptions = BaseRedirectionOptions> = {
  onRedirect?: (options: T) => void;
} & T;

export class Redirection<T extends BaseRedirectionOptions = BaseRedirectionOptions> extends Error {
  readonly name = 'Redirection';
  readonly options: RedirectionOptions<T>;

  static of<T extends Redirection<K>, K extends BaseRedirectionOptions>(
    this: StaticThis<T, K>,
    options: RedirectionOptions<K>
  ) {
    return new this(options);
  }

  constructor(options: RedirectionOptions<T>) {
    super(`Redirection to ${options.destination}`);
    this.options = options;
  }

  async redirect() {
    if (this.options.onRedirect == null) {
      throw new Error('Redirection method not defined');
    }
    this.options.onRedirect?.(this.options);
  }
}

export function isRedirection<T extends BaseRedirectionOptions = BaseRedirectionOptions>(
  data: unknown
): data is Redirection<T> {
  return data != null && (data as any)?.name === 'Redirection';
}

type StaticThis<T, K> = { new (args: K): T };
