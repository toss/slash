import { render, screen, waitFor } from '@testing-library/react';
import { ImpressionArea } from '../ImpressionArea';
import { mockImpression } from './mockImpression';

beforeEach(() => {
  mockImpression.setup();
});

afterEach(() => {
  mockImpression.cleanup();
});

describe('mockImpression', () => {
  it('view() 로 impression을 발생시킬 수 있다.', async () => {
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

  it('자식에 view()를 호출해도 impression이 발생한다.', async () => {
    const onImpressionStart = jest.fn();
    const onImpressionEnd = jest.fn();

    render(
      <ImpressionArea onImpressionEnd={onImpressionEnd} onImpressionStart={onImpressionStart}>
        안녕하세요 <span>테스트</span>
      </ImpressionArea>
    );

    const span = screen.getByText('테스트');

    mockImpression.view(span);

    await waitFor(() => {
      expect(onImpressionStart).toBeCalledTimes(1);
    });

    expect(onImpressionEnd).not.toBeCalled();

    mockImpression.hide(span);

    await waitFor(() => {
      expect(onImpressionEnd).toBeCalledTimes(1);
    });
  });
});
