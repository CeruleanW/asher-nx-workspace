import { setupWorker } from 'msw';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
// export const worker = setupWorker(...handlers);

/**
 * start mocking
 */
export function initMock() {
  // mock APIs in local development environment
  console.debug('start mocking APIs');
  const worker = setupWorker(...handlers);
  worker.start({
    onUnhandledRequest: 'bypass',
  });
  return;
}