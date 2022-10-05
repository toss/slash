import { screen, render, waitFor } from '@testing-library/react';
import { ImpressionArea } from '.';
import { mockImpression } from './testing';

beforeEach(() => {
  mockImpression.setup();
});

afterEach(() => {
  mockImpression.cleanup();
});

describe('ImpressionArea', () => {
  it('사용자에게 보여지면 onImpressionStart가 호출되고, 가려지면 onImpressionEnd가 호출된다.', async () => {
    const onImpressionStart = jest.fn();
    const onImpressionEnd = jest.fn();

    render(
      <ImpressionArea onImpressionEnd={onImpressionEnd} onImpressionStart={onImpressionStart}>
        안녕하세요
      </ImpressionArea>
    );

    const div = screen.getByText('안녕하세요');

    mockImpression.view(div);

    await waitFor(() => {
      expect(onImpressionStart).toBeCalledTimes(1);
    });

    expect(onImpressionEnd).not.toBeCalled();

    mockImpression.hide(div);

    await waitFor(() => {
      expect(onImpressionEnd).toBeCalledTimes(1);
    });
  });
});
