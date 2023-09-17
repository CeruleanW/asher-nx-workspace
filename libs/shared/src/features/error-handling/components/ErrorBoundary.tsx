import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useTheme, DefaultTheme } from 'styled-components';

function ErrorFallback({ error, resetErrorBoundary, ...optionals }) {
  const { enableReset = false, ...rest } = optionals;

  const theme: DefaultTheme = useTheme();

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: theme.palette.danger }}>{error?.message}</pre>
      {enableReset ? <button onClick={resetErrorBoundary}>Try again</button> : null}
    </div>
  )
}

export function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
  )
}
