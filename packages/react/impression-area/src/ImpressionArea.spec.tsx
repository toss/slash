import { render, screen, waitFor } from '@testing-library/react';
import { delay } from '@toss/utils';
import { ImpressionArea } from '.';
import { clearMockDocumentVisibilityState, mockDocumentVisibilityState, mockViewport } from './testing';

beforeEach(() => {
  mockViewport.setup();
});

afterEach(() => {
  mockViewport.cleanup();
  clearMockDocumentVisibilityState();
});

describe('ImpressionArea', () => {
  it('요소가 viewport에서 보여지면 onImpressionStart가 호출되고, 가려지면 onImpressionEnd가 호출된다.', async () => {
    const onImpressionStart = jest.fn();
    const onImpressionEnd = jest.fn();

    render(
      <ImpressionArea onImpressionEnd={onImpressionEnd} onImpressionStart={onImpressionStart}>
        안녕하세요
      </ImpressionArea>
    );

    const element = screen.getByText('안녕하세요');

    // element가 viewport에 보여지면
    mockViewport.enter(element);

    await waitFor(() => {
      // onImpressionStart가 호출된다.
      expect(onImpressionStart).toBeCalledTimes(1);
    });
    expect(onImpressionEnd).toBeCalledTimes(0);

    onImpressionStart.mockClear();

    // element가 viewport에서 사라지면
    mockViewport.exit(element);

    await waitFor(() => {
      // onImpressionEnd가 호출된다.
      expect(onImpressionEnd).toBeCalledTimes(1);
    });
    expect(onImpressionStart).toBeCalledTimes(0);
  });

  it('요소가 viewport에서 보여지더라도 문서가 백그라운드라면 onImpressionStart가 호출되지 않는다.', async () => {
    const onImpressionStart = jest.fn();

    render(<ImpressionArea onImpressionStart={onImpressionStart}>안녕하세요</ImpressionArea>);

    const element = screen.getByText('안녕하세요');

    // 문서가 백그라운드라면
    mockDocumentVisibilityState('hidden');
    // element가 viewport에 보여져도
    mockViewport.enter(element);

    await delay(100);

    // onImpressionStart가 호출되지 않는다.
    expect(onImpressionStart).toBeCalledTimes(0);
  });

  it('문서가 백그라운드가 되면 onImpressionEnd가 호출되고, 다시 포그라운드가 되면 onImpressionStart가 호출된다.', async () => {
    const onImpressionStart = jest.fn();
    const onImpressionEnd = jest.fn();

    render(
      <ImpressionArea onImpressionEnd={onImpressionEnd} onImpressionStart={onImpressionStart}>
        안녕하세요
      </ImpressionArea>
    );

    const element = screen.getByText('안녕하세요');

    mockViewport.enter(element);

    await waitFor(() => {
      expect(onImpressionStart).toBeCalledTimes(1);
    });

    onImpressionStart.mockClear();

    // 문서가 백그라운드가 되면
    mockDocumentVisibilityState('hidden');

    await waitFor(() => {
      // onImpressionEnd가 호출된다.
      expect(onImpressionEnd).toBeCalledTimes(1);
    });
    expect(onImpressionStart).toBeCalledTimes(0);

    onImpressionEnd.mockClear();

    // 문서가 포그라운드가 되면
    mockDocumentVisibilityState('visible');

    await waitFor(() => {
      // onImpressionStart가 호출된다.
      expect(onImpressionStart).toBeCalledTimes(1);
    });
    expect(onImpressionEnd).toBeCalledTimes(0);
  });

  it('사용자에게 보여지지 않는 요소는 onImpressionEnd가 호출되지 않는다.', async () => {
    const onImpressionEnd = jest.fn();

    render(<ImpressionArea onImpressionEnd={onImpressionEnd}>안녕하세요</ImpressionArea>);

    // 문서가 백그라운드가 되어도
    mockDocumentVisibilityState('hidden');

    await delay(100);

    // 원래부터 사용자에게 보여지고있지 않았기 때문에, onImpressionEnd가 호출되지 않는다.
    expect(onImpressionEnd).toBeCalledTimes(0);
  });
});
