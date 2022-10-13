# @toss/storage

브라우저의 시크릿 모드나 테스트 환경과 같이 Web Storage를 쓸 수 없는 환경에서 `localStorage`나 `sessionStorage` 등에 접근하려고 하면 에러가 발생합니다.

`@toss/storage` 패키지는 그런 환경에서도 에러 없이 Web Storage를 쓸 수 있도록 돕는 라이브러리입니다. `@toss/storage/typed`를 쓰면 타입 안전하게 스토리지의 값을 다룰 수 있습니다.
