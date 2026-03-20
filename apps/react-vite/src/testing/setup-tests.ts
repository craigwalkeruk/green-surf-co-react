import '@testing-library/jest-dom/vitest';

import { initializeDb, resetDb } from '@/testing/mocks/db';
import { server } from '@/testing/mocks/server';

vi.mock('zustand');

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => {
  class ResizeObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  vi.stubGlobal('ResizeObserver', ResizeObserverMock);

  // Mock localStorage for jsdom
  const localStorageMock = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(() => null),
  };
  vi.stubGlobal('localStorage', localStorageMock);

  window.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64');
  window.atob = (str: string) => Buffer.from(str, 'base64').toString('binary');

  initializeDb();
});
afterEach(() => {
  server.resetHandlers();
  resetDb();
});
