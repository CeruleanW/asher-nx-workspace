import { ThemeProvider, DefaultTheme } from 'styled-components';
import { palette, font, size } from './variables';

const theme: DefaultTheme = {
  palette,
  font,
  size,
};

export function Theme(props) {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
