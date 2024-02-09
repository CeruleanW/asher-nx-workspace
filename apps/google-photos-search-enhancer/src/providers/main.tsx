import AccessProvider from '../components/Context/AccessContext';
import FeedbackProvider from '../components/Context/FeedbackContext';
import { ReduxProvider } from './redux';
import { ThemeProvider, muiTheme } from '@root/shared/styles';
/**
 *
 */
export function CompositeProvider({ children }) {
  return (
    <>
      <ReduxProvider>
        <AccessProvider>
          <ThemeProvider theme={muiTheme}>
            <FeedbackProvider>
              {children}
            </FeedbackProvider>
          </ThemeProvider>
        </AccessProvider>
      </ReduxProvider>
    </>
  );
}
