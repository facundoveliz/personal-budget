import React, { ReactElement, ReactNode, useState } from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyle } from '../themes';
import { NextPage } from 'next';
import './_app.css';
import { ThemeContext } from '../components/userContext';

// FIX: server tests and git workflows (tests not running)

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        {Component.getLayout ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
