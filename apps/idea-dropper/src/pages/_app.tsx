import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { AppProvider } from '../providers';
import { APPNAME } from '../lib/CONSTANTS';
import { NotificationGroup } from '@root/shared/features/notification';
import 'react-toastify/dist/ReactToastify.css';
// import { useEffect } from 'react';

/**
 *
 */
function CustomApp({ Component, pageProps }: AppProps) {

  // useEffect(() => {
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  // }, []);

  return (
    <>
      <Head>
        <title>{APPNAME}</title>
      </Head>
      <AppProvider>
        <main className="flex flex-col grow h-screen">
          <Component {...pageProps} />
        </main>
        <NotificationGroup />
      </AppProvider>
    </>
  );
}

export default CustomApp;
