import { waitFor } from '@testing-library/react';
import { mockViewport } from './mockViewport';

beforeEach(() => {
  mockViewport.setup();
});

afterEach(() => {
  mockViewport.cleanup();
});

describe('mockViewport', () => {
  it('element에 enter(), exit()를 호출하면 intersect를 발생한다', async () => {
    const intersectionEvents: boolean[] = [];

    const observer = new IntersectionObserver(entries => {
      intersectionEvents.push(entries[0]!.isIntersecting);
    });

    const element = document.createElement('div');
    observer.observe(element);

    mockViewport.enter(element);

    await waitFor(() => {
      // observer가 호출되며 isIntersecting이 true로 전달된다.
      expect(intersectionEvents).toEqual([true]);
    });

    mockViewport.exit(element);

    await waitFor(() => {
      // observer가 호출되며 isIntersecting이 false로 전달된다.
      expect(intersectionEvents).toEqual([true, false]);
    });
  });

  it('자식 element에 enter()를 호출해도 intersect가 발생한다.', async () => {
    const intersectionEvents: boolean[] = [];

    const observer = new IntersectionObserver(entries => {
      intersectionEvents.push(entries[0]!.isIntersecting);
    });

    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    observer.observe(parent);

    mockViewport.enter(child);

    await waitFor(() => {
      // observer가 호출되며 isIntersecting이 true로 전달된다.
      expect(intersectionEvents).toEqual([true]);
    });
  });
});
