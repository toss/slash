/** @jsxImportSource react */
import classnames from 'classnames';
import { PureComponent } from 'react';
import Style, { generateClassNames } from '../../utils/Style';

interface Props {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  /* default true */
  enabled?: boolean;
}

/**
 * @name ClickArea
 * @description
 * Clickable한 영역에 사용합니다. 영역이 `div`로 감싸지며, 클릭 시 살짝 어두워집니다.
 *
 * ```typescript
 * <ClickArea
 *   // CSS className
 *   className={className}
 *   // 클릭 시 실행할 함수 (`() => void`)
 *   onClick={onClick}
 *   // 클릭 가능 여부 (`boolean`)
 *   enabled={enabled}
 * >
 *   {children}
 * </ClickArea>
 * ```
 *
 * @example
 * <ClickArea onClick={openBottomSheet}>
 *   <Icon name="guide-line" color={adaptive.grey500} />
 * </ClickArea>
 */
export class ClickArea extends PureComponent<Props> {
  public render() {
    const { className, children, enabled = true, ...rest } = this.props;

    return (
      <Style css={css}>
        <a
          role="button"
          className={classnames(className, CLASSNAMES.clickArea, { [CLASSNAMES.enabled]: enabled })}
          {...rest}
          onTouchStart={this.dummyhandleTouchStart}
        >
          {children}
        </a>
      </Style>
    );
  }

  private dummyhandleTouchStart = () => {
    // iOS에서 :active 선택자가 작동하지 않아 사용하는 Hack
    // 참조: https://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari
  };
}

const CLASSNAMES = generateClassNames({
  clickArea: 'click-area',
  enabled: `click-area__enabled`,
});

const css = `
.${CLASSNAMES.clickArea} {
  position: relative;
  display: block;
}
.${CLASSNAMES.enabled}::after {
  position: absolute;
  content: ' ';
  background-color: transparent;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: background-color 0.1s ease-in-out;
}
.${CLASSNAMES.enabled}:active::after {
  background-color: rgba(0, 0, 0, 0.04);
}`;
