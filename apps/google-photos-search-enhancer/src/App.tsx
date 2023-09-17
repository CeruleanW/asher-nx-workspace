import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './components/atomic/Footer';
import { Main } from './components/Main';
import { CompositeProvider } from './providers'

export default function App() {
  return (
    <CompositeProvider>
      <CssBaseline />
      <Main />
      <Footer />
    </CompositeProvider>
  );
}
