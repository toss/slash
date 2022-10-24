/* eslint-disable @typescript-eslint/no-var-requires */
const setup = require('@tossteam/jest').setup;

// jsdom 사용하기
setup.jsdom();

// App bridge mock을 사용하려면 아래 주석을 해제해주세요.
// setup.appBridge();
