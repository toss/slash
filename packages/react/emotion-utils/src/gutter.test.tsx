/** @jsxImportSource @emotion/react */

import { render } from '@testing-library/react';

import { GutterOptions, gutter } from './gutter';

const DEFAULT_GUTTER_SPACE = 24;

describe('gutter', () => {
  describe('direction: vertical', () => {
    const direction = 'vertical';

    it(`첫 번째 인자에 '${direction}'을 넘기는 경우 두번째 노드부터 상단 여백 값을 가진다.`, () => {
      const { getAllByTestId } = render(
        <div css={gutter(direction)}>
          <div data-testid="child" />
          <div data-testid="child" />
        </div>
      );

      getAllByTestId('child').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-top: ${DEFAULT_GUTTER_SPACE}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-top: ${DEFAULT_GUTTER_SPACE}px`);
        }
      });
    });

    it(`상단 여백 값을 두 번째 인자로 넘길 수 있다.`, () => {
      const gutterSpace = 48;

      const { getAllByTestId } = render(
        <div css={gutter(direction, gutterSpace)}>
          <div data-testid="child" />
          <div data-testid="child" />
        </div>
      );

      getAllByTestId('child').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-top: ${gutterSpace}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-top: ${gutterSpace}px`);
        }
      });
    });

    it(`여백을 줄 하위 노드를 세 번째 인자에 지정할 수 있다.`, () => {
      const selector = 'button';

      const { getAllByTestId } = render(
        <div css={gutter(direction, DEFAULT_GUTTER_SPACE, selector)}>
          <button data-testid="child" />
          <div data-testid="child" />
          <button data-testid="child" />
          <button data-testid="child" />
          <div data-testid="child" />
          <button data-testid="child" />
        </div>
      );

      getAllByTestId('child').forEach((element, index) => {
        if (element.tagName === selector.toUpperCase() && index > 0) {
          expect(element).toHaveStyle(`margin-top: ${DEFAULT_GUTTER_SPACE}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-top: ${DEFAULT_GUTTER_SPACE}px`);
        }
      });
    });

    it(`인자 값을 객체로 넘기는 것이 가능하다.`, () => {
      const selector = 'button';
      const gutterOptions: GutterOptions = {
        direction,
        space: DEFAULT_GUTTER_SPACE,
        selector,
      };

      const { getAllByTestId } = render(
        <div css={gutter(gutterOptions)}>
          <button data-testid="child" />
          <div data-testid="child" />
          <button data-testid="child" />
          <button data-testid="child" />
          <div data-testid="child" />
          <button data-testid="child" />
        </div>
      );

      getAllByTestId('child').forEach((element, index) => {
        if (element.tagName === selector.toUpperCase() && index > 0) {
          expect(element).toHaveStyle(`margin-top: ${DEFAULT_GUTTER_SPACE}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-top: ${DEFAULT_GUTTER_SPACE}px`);
        }
      });
    });
  });

  describe('direction: horizontal', () => {
    const direction = 'horizontal';

    it(`첫 번째 인자에 '${direction}'을 넘기는 경우 두번째 노드부터 좌측 여백 값을 가진다.`, () => {
      const { getAllByTestId } = render(
        <div css={gutter(direction)}>
          <div data-testid="child" />
          <div data-testid="child" />
        </div>
      );

      getAllByTestId('child').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-left: ${DEFAULT_GUTTER_SPACE}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-left: ${DEFAULT_GUTTER_SPACE}px`);
        }
      });
    });

    it(`좌측 여백 값을 두 번째 인자로 넘길 수 있다.`, () => {
      const gutterSpace = 48;

      const { getAllByTestId } = render(
        <div css={gutter(direction, gutterSpace)}>
          <div data-testid="child" />
          <div data-testid="child" />
        </div>
      );

      getAllByTestId('child').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-left: ${gutterSpace}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-left: ${gutterSpace}px`);
        }
      });
    });

    it(`여백을 줄 하위 노드를 세 번째 인자에 지정할 수 있다.`, () => {
      const selector = 'button';

      const { getAllByTestId } = render(
        <div css={gutter(direction, DEFAULT_GUTTER_SPACE, selector)}>
          <button data-testid="child" />
          <div data-testid="child" />
          <button data-testid="child" />
          <button data-testid="child" />
          <div data-testid="child" />
          <button data-testid="child" />
        </div>
      );

      getAllByTestId('child').forEach((element, index) => {
        if (element.tagName === selector.toUpperCase() && index > 0) {
          expect(element).toHaveStyle(`margin-left: ${DEFAULT_GUTTER_SPACE}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-left: ${DEFAULT_GUTTER_SPACE}px`);
        }
      });
    });

    it(`인자 값을 객체로 넘기는 것이 가능하다.`, () => {
      const selector = 'button';
      const gutterOptions: GutterOptions = {
        direction,
        space: DEFAULT_GUTTER_SPACE,
        selector,
      };

      const { getAllByTestId } = render(
        <div css={gutter(gutterOptions)}>
          <button data-testid="child" />
          <div data-testid="child" />
          <button data-testid="child" />
          <button data-testid="child" />
          <div data-testid="child" />
          <button data-testid="child" />
        </div>
      );

      getAllByTestId('child').forEach((element, index) => {
        if (element.tagName === selector.toUpperCase() && index > 0) {
          expect(element).toHaveStyle(`margin-left: ${DEFAULT_GUTTER_SPACE}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-left: ${DEFAULT_GUTTER_SPACE}px`);
        }
      });
    });
  });

  it('style tag는 gutter 대상에 포함시키지 않는다', () => {
    const direction = 'vertical';

    const { getAllByTestId } = render(
      <div css={gutter(direction)}>
        <style data-emotion="css asdf" />
        <div data-testid="child" />
        <div data-testid="child" />
      </div>
    );

    getAllByTestId('child').forEach((element, index) => {
      if (index > 0) {
        expect(element).toHaveStyle(`margin-top: ${DEFAULT_GUTTER_SPACE}px`);
      } else {
        expect(element).not.toHaveStyle(`margin-top: ${DEFAULT_GUTTER_SPACE}px`);
      }
    });
  });
});
