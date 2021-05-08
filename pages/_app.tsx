import React, { ReactNode } from 'react';
import Head from 'next/head';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { red } from '@material-ui/core/colors';
import '../public/styles.css'
import Nav from '../components/Nav';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#035efc',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});


interface IMyApp {
  Component: any,
  pageProps: Object,
}

export default function MyApp(props: IMyApp) {
  const { Component, pageProps } = props;

  const [location, setLocation] = React.useState(0);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const title = "Time span calculator"

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </Head>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" className="app-bar">
          <Toolbar variant="dense" >
            <Typography variant="h6" color="inherit">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <Component {...pageProps} />
        <Nav setLocation={setLocation} location={location} />
      </ThemeProvider>
    </React.Fragment>
  );
}

