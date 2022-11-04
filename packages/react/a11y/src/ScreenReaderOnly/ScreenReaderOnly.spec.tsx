import { render } from '@testing-library/react';
import { ScreenReaderOnly } from '.';

const renderFixture = (testId = 'fixture') => {
  const { getByTestId } = render(
    <ScreenReaderOnly data-testid={testId}>
      <h1>토스</h1>
    </ScreenReaderOnly>
  );

  return getByTestId(testId);
};

describe('ScreenReaderOnly', () => {
  it('should have proper style', () => {
    const fixture = renderFixture();

    expect(fixture).toHaveStyle({
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0px',
      margin: '-1px',
      borderWidth: '0px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    });
  });
});
