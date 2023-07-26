import { MaybePromise, Options } from 'tsup';

declare function defineConfig(moreOptions?: Options | Options[] | ((overrideOptions: Options) => MaybePromise<Options | Options[]>), basePath?: string): Options | Options[] | ((overrideOptions: Options) => MaybePromise<Options | Options[]>);

export default defineConfig;
