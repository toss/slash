/** @jsxImportSource @emotion/react */

import { render } from '@testing-library/react';

import { gutter, GutterOptions } from './gutter';

const DEFAULT_GUTTER_SPACE = 24;

describe('gutter', () => {
  describe('direction: vertical', () => {
    const direction = 'vertical';

    it(`should have top margin starting from the second child when '${direction}' is passed as the first parameter.`, () => {
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

    it(`should accept top margin value as the second parameter.`, () => {
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

    it(`should accept a selector for child nodes with margin.`, () => {
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

    it(`should accept an object as an argument for options.`, () => {
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

    it(`should have left margin for nodes starting from the second when passing '${direction}' as the first argument`, () => {
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

    it(`should be able to pass left margin value as the second argument`, () => {
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

    it(`should specify the child for margin as the third argument`, () => {
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

    it(`should be possible to pass arguments as an object`, () => {
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

  it('should not include the style tag in the gutter targets', () => {
    const { getAllByTestId } = render(
      <div css={gutter('vertical')}>
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

  it('should be able to pass arguments as an object', () => {
    const { getAllByTestId } = render(
      <div css={gutter({ direction: 'vertical' })}>
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
