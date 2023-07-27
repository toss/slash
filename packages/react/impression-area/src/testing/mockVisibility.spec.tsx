import { clearMockDocumentVisibilityState, mockDocumentVisibilityState } from './mockVisibility';

describe('mockDocumentVisibilityState', () => {
  afterEach(clearMockDocumentVisibilityState);

  it('호출하면 document.visibilityState를 모킹하고 visibilitychange 이벤트를 발생시킨다', () => {
    const mockHandler = jest.fn();

    document.addEventListener('visibilitychange', () => {
      mockHandler(document.visibilityState);
    });

    mockDocumentVisibilityState('visible');
    expect(mockHandler).toHaveBeenNthCalledWith(1, 'visible');

    mockDocumentVisibilityState('hidden');
    expect(mockHandler).toHaveBeenNthCalledWith(2, 'hidden');
  });
});

describe('clearDocumentVisibilityStateMock', () => {
  it('초기 값으로 되돌린다.', () => {
    const origin = document.visibilityState;

    mockDocumentVisibilityState(origin === 'visible' ? 'hidden' : 'visible');
    clearMockDocumentVisibilityState();

    expect(document.visibilityState).toEqual(origin);
  });
});
