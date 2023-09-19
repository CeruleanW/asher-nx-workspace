/**
 * Measure & collect issues from clients
 */
import * as Sentry from "@sentry/react";

export function initMonitoring() {
  Sentry.init({
    dsn: "",
    integrations: [new Sentry.BrowserTracing(),],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    // tracesSampleRate: 0.7,
  });
}
