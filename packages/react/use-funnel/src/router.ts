import type { ParsedUrlQuery } from 'querystring';
import type { UrlObject } from 'url';

type TransitionOptions = {
  shallow?: boolean;
};

type Url = UrlObject | string;

export type Router = {
  push(url: Url, as?: Url, options?: TransitionOptions): Promise<boolean>;
  replace(url: Url, as?: Url, options?: TransitionOptions): Promise<boolean>;
  query: ParsedUrlQuery;
  basePath: string;
  pathname: string;
};
