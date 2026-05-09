// msw is not installed in this workspace; typed as any per migration spec (third-party lib without types).
import { handlers } from './handlers/handlers';

// This configures a Service Worker with the given request handlers.
// export const worker = setupWorker(...handlers);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyWorker = { start: (opts: { onUnhandledRequest: string }) => void };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SetupWorkerFn = (...handlers: any[]) => AnyWorker;

/**
 * start mocking
 */
export function initMock(): void {
  // mock APIs in local development environment
  console.debug('start mocking APIs');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupWorker } = require('msw') as { setupWorker: SetupWorkerFn };
  const worker = setupWorker(...handlers);
  worker.start({
    onUnhandledRequest: 'bypass',
  });
  return;
}
