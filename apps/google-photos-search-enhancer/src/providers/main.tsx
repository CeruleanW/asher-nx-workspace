import AccessProvider from '../components/Context/AccessContext';
import FeedbackProvider from '../components/Context/FeedbackContext';
import { ReduxProvider } from './redux';

export function CompositeProvider({ children }) {
  return (
    <>
      <ReduxProvider>
        <AccessProvider>
          <FeedbackProvider>{children}</FeedbackProvider>
        </AccessProvider>
      </ReduxProvider>
    </>
  );
}
