import { ThemeProvider, DefaultTheme } from 'styled-components';
import { palette, font, size } from '../styles/variables';

const theme: DefaultTheme = {
  palette,
  font,
  size,
};

export default function Theme(props) {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
