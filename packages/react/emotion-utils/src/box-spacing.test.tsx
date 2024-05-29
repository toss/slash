/** @jsxImportSource @emotion/react */
import { SerializedStyles } from '@emotion/react';
import { cleanup, render } from '@testing-library/react';
import { BoxSpacingPresets, margin, padding } from './box-spacing';

function renderFixture(style: SerializedStyles, testId = 'fixture') {
  const { getByRole } = render(<div role={testId} css={style} />);

  return getByRole(testId);
}

const properties = ['x', 'y', 'top', 'right', 'bottom', 'left'];
const units = [4, 8, 12, 16, 24, 32];

afterEach(cleanup);

describe('padding', () => {
  it('padding 스타일을 top,right,bottom,left을 지정해 입힐 수 있다.', () => {
    const fixture = renderFixture(
      padding({
        top: 8,
        right: 16,
        bottom: 24,
        left: 32,
      })
    );

    expect(fixture).toHaveStyle({
      padding: '8px 16px 24px 32px',
    });
  });

  it('padding 스타일을 x,y를 지정해 입힐 수 있다.', () => {
    const fixture = renderFixture(
      padding({
        x: 10,
        y: '10%',
      })
    );

    expect(fixture).toHaveStyle({
      'padding-top': '10%',
      'padding-bottom': '10%',
      'padding-left': '10px',
      'padding-right': '10px',
    });
  });

  it('padding 스타일을 top,bottom,x를 지정해 입힐 수 있다.', () => {
    const fixture = renderFixture(
      padding({
        x: 10,
        top: 8,
        bottom: 24,
      })
    );

    expect(fixture).toHaveStyle({
      'padding-top': '8px',
      'padding-bottom': '24px',
      'padding-left': '10px',
      'padding-right': '10px',
    });
  });

  it('padding 스타일을 left,right,y를 지정해 입힐 수 있다.', () => {
    const fixture = renderFixture(
      padding({
        y: '10%',
        right: 16,
        left: 32,
      })
    );

    expect(fixture).toHaveStyle({
      'padding-top': '10%',
      'padding-bottom': '10%',
      'padding-left': '32px',
      'padding-right': '16px',
    });
  });

  it('padding 스타일을 메소드로 입힐 수 있다', () => {
    const fixture = renderFixture(padding.x(100));

    expect(fixture).toHaveStyle({
      'padding-left': '100px',
      'padding-right': '100px',
    });

    expect(fixture).not.toHaveStyle({
      'padding-top': '100px',
      'padding-bottom': '100px',
    });
  });

  it('padding 스타일을 문자열로 입힐 수 있다.', () => {
    const css = '500px';
    const fixture = renderFixture(padding(css));

    expect(fixture).toHaveStyle({
      padding: css,
    });
  });

  it('preset이 존재한다.', () => {
    for (const property of properties) {
      for (const unit of units) {
        const key = `${property}${unit}` as keyof BoxSpacingPresets;

        expect(padding[key]).not.toBeUndefined();
      }
    }
  });
});

describe('margin', () => {
  it('margin 스타일을 top,right,bottom,left을 지정해 입힐 수 있다.', () => {
    const fixture = renderFixture(
      margin({
        top: 8,
        right: 16,
        bottom: 24,
        left: 32,
      })
    );

    expect(fixture).toHaveStyle({
      margin: '8px 16px 24px 32px',
    });
  });

  it('margin 스타일을 x,y를 지정해 입힐 수 있다.', () => {
    const fixture = renderFixture(
      margin({
        x: 10,
        y: '10%',
      })
    );

    expect(fixture).toHaveStyle({
      'margin-left': '10px',
      'margin-right': '10px',
      'margin-top': '10%',
      'margin-bottom': '10%',
    });
  });

  it('margin 스타일을 top,bottom,x를 지정해 입힐 수 있다.', () => {
    const fixture = renderFixture(
      margin({
        x: 10,
        top: 8,
        bottom: 24,
      })
    );

    expect(fixture).toHaveStyle({
      'margin-top': '8px',
      'margin-bottom': '24px',
      'margin-left': '10px',
      'margin-right': '10px',
    });
  });

  it('margin 스타일을 left,right,y를 지정해 입힐 수 있다.', () => {
    const fixture = renderFixture(
      margin({
        y: '10%',
        right: 16,
        left: 32,
      })
    );

    expect(fixture).toHaveStyle({
      'margin-top': '10%',
      'margin-bottom': '10%',
      'margin-left': '32px',
      'margin-right': '16px',
    });
  });

  it('margin 스타일을 메소드로 입힐 수 있다', () => {
    const fixture = renderFixture(margin.y(100));

    expect(fixture).toHaveStyle({
      'margin-top': '100px',
      'margin-bottom': '100px',
    });

    expect(fixture).not.toHaveStyle({
      'margin-left': '100px',
      'margin-right': '100px',
    });
  });

  it('margin 스타일을 문자열로 입힐 수 있다.', () => {
    const css = '500px';
    const fixture = renderFixture(margin(css));

    expect(fixture).toHaveStyle({
      margin: css,
    });
  });

  it('preset이 존재한다.', () => {
    for (const property of properties) {
      for (const unit of units) {
        const key = `${property}${unit}` as keyof BoxSpacingPresets;

        expect(margin[key]).not.toBeUndefined();
      }
    }
  });
});
