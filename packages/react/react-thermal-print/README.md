---
hide_title: true
sidebar_label: '라이브러리 소개'
---

# @tossteam/react-thermal-print

@tossteam/react-thermal-print 라이브러리는 JSX로 선언한 컴포넌트를 EPSON, STAR 영수증 프린터에 출력할 수 있는 라이브러리 입니다.

내부적으로 [node-thermal-printer](https://github.com/Klemen1337/node-thermal-printer)를 사용하고 있습니다.

### 사용 예시

```tsx
import SerialPort from 'serialport';
import { ThermalPrint, renderToBuffer } from '@tossteam/react-thermal-print';

const port = new SerialPort('/dev/tty.usbserial-BLBOf103Y23', {
  baudRate: 9600,
});

const readFile = (src: string): Promise<Buffer> => {
  // ... src 경로의 파일을 읽어옴
}
const toss = 'toss';

const buf = await renderToBuffer(
  <ThermalPrint printerType="epson" width={40} readFile={readFile}>
    <ThermalPrint.Txt align="center">토스팀 {toss}</ThermalPrint.Txt>
    <ThermalPrint.Br />
    <ThermalPrint.Txt>화이팅!</ThermalPrint.Txt>
    <ThermalPrint.Line type="double" />
    <ThermalPrint.Image src="https://static.toss.im/icons/png/1x/logo.png" />
    <ThermalPrint.Row
      left={<ThermalPrint.Txt>왼쪽</ThermalPrint.Txt>}
      right="오른쪽"
    />
  </ThermalPrint>
);

port.write(buf);
```

### 설치하기

```shell
yarn add @tossteam/react-thermal-print
```

### 지원 범위

- 브라우저: 아래 API 사용에 영향을 받습니다.
  * [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder#browser_compatibility)
- node.js: 모든 버전
