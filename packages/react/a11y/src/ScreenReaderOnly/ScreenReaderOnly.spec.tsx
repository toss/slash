import { render } from '@testing-library/react';
import { ScreenReaderOnly } from '.';

describe('ScreenReaderOnly', () => {
  it('should have proper style', () => {
    const result = render(
      <ScreenReaderOnly>
        <h1>토스</h1>
      </ScreenReaderOnly>
    );

    expect(result.getByText('토스')).toBeInTheDocument();
  });
});
