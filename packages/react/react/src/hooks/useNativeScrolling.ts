import useBodyClass from './useBodyClass';
import useStyleSheetInjection from './useStyleSheetInjection';

const css = `
  body.useNativeScrolling .global-content-area {
    overflow: initial !important;
  }
  body.useNativeScrolling .dimmer,
  body.useNativeScrolling .fixed-bottom-cta,
  body.useNativeScrolling .bottom-sheet {
    position: fixed !important;
  }
`;

/**
 * @description
 * `TDSProvider` 컴포넌트에서 제공하는 iOS Webkit 버그 회피를 위한 `global-content-area` 스크롤을 사용하지 않고,
 * 네이티브 기본 브라우저 스크롤을 사용하도록 합니다.
 *
 * 자식 컴포넌트에서 사용하면 컴포넌트 언마운트 시에 클린업 되므로, 최상단 컴포넌트에서만 사용하는 것을 권장합니다.
 */
export default function useNativeScrolling() {
  useStyleSheetInjection(css);
  useBodyClass('useNativeScrolling');
}
