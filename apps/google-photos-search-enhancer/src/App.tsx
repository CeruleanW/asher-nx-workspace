import CssBaseline from '@mui/material/CssBaseline';
import { Footer } from '@root/shared/components/organism/Footer';
import { Main } from './components/Main';
import { CompositeProvider } from './providers';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/**
 *
 */
export function App() {
  return (
    <CompositeProvider>
      <CssBaseline />
      <Main />
      <Footer />
    </CompositeProvider>
  );
}
