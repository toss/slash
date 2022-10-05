# `@tossteam/ky`

[ky](https://github.com/sindresorhus/ky) 라이브러리를 CJS-ESM 모두에서 호환되도록 만든 토스팀 라이브러리입니다. 

라이브러리 사용 방법은 [ky](https://github.com/sindresorhus/ky)의 문서를 참고해주세요.

```shell
$ node
> require("@tossteam/ky")
# -> 가능

> await import("@tossteam/ky")
# -> 가능
```

## 왜 필요한가요?

`ky` 라이브러리는 아래와 같은 문제를 가지고 있습니다.

- ESM-only 라이브러리이기 때문에 CJS로 `require()` 하려고 하는 경우 오류가 발생합니다.
- SSR 대응을 위해서는 `ky-universal` 라이브러리를 사용해야 합니다.

`@tossteam/ky`는 토스팀 전체에서 `ky` 를 쉽게 사용할 수 있도록 이를 개선합니다.

- ESBuild로 한 차례 빌드함으로써 CJS-ESM 모두에서 사용할 수 있도록 하고,
- 서버에서도 `ky-universal`을 쓸지, `ky` 를 쓸지, 구분할 필요 없이 `@tossteam/ky` 만 쓰면 되도록 합니다.


## 왜 빌드된 결과물이 소스코드에 포함되어 있나요?

- 빌드된 결과물을 소스코드에 포함하지 않으면 frontend-libraries 내부에서 Jest 등을 실행할 때 내부적으로 `require('ky')` 가 실행되어서 `ERR_REQUIRE_ESM` 오류를 만나게 됩니다. 어쩔 수 없이 `ky` 를 빌드된 상태로 소스코드에 포함하도록 했습니다.
- 빌드된 결과물을 업데이트하려면 `yarn build` 를 `ky` 디렉토리에서 실행해주시고, 변경사항을 커밋해주세요.