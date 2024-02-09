import { createTheme, Theme } from '@mui/material/styles';

export { useTheme, makeStyles } from '@mui/styles';
export { ThemeProvider, styled } from '@mui/material/styles';

declare module '@mui/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {

  }
}

export const muiTheme = createTheme();
