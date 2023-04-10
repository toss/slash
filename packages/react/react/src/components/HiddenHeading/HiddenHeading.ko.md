# HiddenHeading

- See: https://www.accessibility-developer-guide.com/examples/headings/html-5-outline/

접근성 목적을 위해 사용할 수 있는 헤딩 컴포넌트입니다.

토스앱의 일반 사용자에게는 보이지 않지만 스크린리더를 사용하는 사용자들에게만 텍스트가 보입니다.

- 유사한 컴포넌트로 `<ScreenReaderOnly />` 컴포넌트가 있습니다.
- 페이지 구역을 나눌때 보조기술은 HTML5 Outline과 다르게 작동하므로, 헤딩의 수준에 따라 'as'를 적절하게 사용하여 구역을 의미있게 나눠주시기 바랍니다.

## Example

```jsx
// 일반 사용자는 바텀시트의 디머 바깥에서 어둡게 보이는 모습을 통해 이 바텀시트가 '프로필 종류를 선택'하는 바텀시트임을 쉽게 알 수 있지만 스크린리더 사용자의 경우 어떤 바텀시트인지 알 수 없을 때
<BottomSheet>
  <HiddenHeading as="h3" id={id}>
    사용할 프로필의 종류를 선택해주세요
  </HiddenHeading>
  <List role="radiogroup" aria-labelledby={id}>
    // blahblah
  </List>
</BottomSheet>
```
