/**
 * Measure & collect issues from clients
 */
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

export function initMonitoring() {
  Sentry.init({
    dsn: "https://35f6a12cc83440748f574c555fe07af9@o1143758.ingest.sentry.io/6350451",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    // tracesSampleRate: 0.7,
  });
}