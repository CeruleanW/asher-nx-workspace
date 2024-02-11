import {Theme} from '../styles/base/Theme';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider, muiTheme } from '@root/shared/styles';
import { Theme as StyledComponentsThemeProvider } from './Theme';

export function ProviderGroup({ children }) {
  return (
    <Theme>
      <ThemeProvider theme={muiTheme}>
        <StyledEngineProvider injectFirst>
          <StyledComponentsThemeProvider>
            {children}
          </StyledComponentsThemeProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </Theme>
  )
}
