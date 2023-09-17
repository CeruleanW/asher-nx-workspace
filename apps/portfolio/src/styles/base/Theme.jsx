//Styles
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const themeInstance = createTheme({
  palette: {
    main: '#2C2C2C',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#2C2C2C',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#FEFEFE',
    },
    secondary: {
      light: '#DCEAEB',
      main: '#88BBBC',
      dark: '#055158',
      contrastText: '#fff',
    },
    text: {
      main: '#373737',
      primary: '#373737',
      secondary: '#505050',
      contrastBackground: '#65FFC9',
    },
    result: {
      danger: { main: '#d32f2f' },
      alert: { main: '#ffa000' },
      success: { main: '#388e3c' },
    },
    // // Used by `getContrastText()` to maximize the contrast between
    // // the background and the text.
    // contrastThreshold: 3,
    // // Used by the functions below to shift a color's luminance by approximately
    // // two indexes within its tonal palette.
    // // E.g., shift from Red 500 to Red 300 or Red 700.
    // tonalOffset: 0.2,
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "'Raleway', sans-serif",
        },
      },
    },
  },
});

const font = {
  first: "'Raleway', sans-serif;",
  second: 'Muli, sans-serif',
  body: 'Montserrat, sans-serif',
};

themeInstance.typography.h1 = {
  fontSize: '1.9rem',
  [themeInstance.breakpoints.up('md')]: {
    fontSize: '2.8rem',
  },
  lineHeight: 1.567,
  fontFamily: font.first,
  fontWeight: 700,
};

themeInstance.typography.h2 = {
  fontSize: '1.5rem',
  fontFamily: font.first,
  [themeInstance.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
  lineHeight: 1.567,
};

themeInstance.typography.h5 = {
  fontSize: '1.5rem',
  fontFamily: font.second,
};

themeInstance.typography.body1 = {
  fontFamily: font.body,
  lineHeight: '28px',
  fontSize: '16px',
  fontWeight: 400,
  opacity: '0.9',
};

themeInstance.typography.subtitle1 = {
  fontFamily: font.body,
};

export default function Theme(props) {
  return <ThemeProvider theme={themeInstance}>{props.children}</ThemeProvider>;
}
