import Theme from '../styles/base/Theme';
import { StyledEngineProvider } from '@mui/material/styles';
import {Theme as StyledComponentsThemeProvider} from './Theme';

export function ProviderGroup({children}) {
  return (
    <Theme>
      <StyledEngineProvider injectFirst>
        <StyledComponentsThemeProvider>
        {children}
        </StyledComponentsThemeProvider>
      </StyledEngineProvider>
    </Theme>
  )
}
