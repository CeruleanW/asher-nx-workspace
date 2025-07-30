import CssBaseline from '@mui/material/CssBaseline';
import { Footer } from '@root/shared/components/organism/Footer';
import { Main } from './components/Main';
import { CompositeProvider } from './providers';
import { GoogleApiProvider } from '@root/shared/features/google-api';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { OAUTH2 } from './features/g-api';

/**
 *
 */
export function App() {

  const clientConfig = {
    client_id: OAUTH2.clientID,
    cookie_policy: 'single_host_origin'
  };
  return (
    <CompositeProvider>
      <CssBaseline />
      <GoogleApiProvider clientConfig={clientConfig} >
        <Main />
      </GoogleApiProvider>
      <Footer />
    </CompositeProvider>
  );
}
