import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { AppProvider } from '../providers';
import { APPNAME } from '../lib/CONSTANTS';
import { NotificationGroup } from '@root/shared/features/notification';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../lib/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

/**
 *
 */
function CustomApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{APPNAME}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppProvider>
        <main className="flex flex-col grow h-screen">
          <Component {...pageProps} />
        </main>
        <NotificationGroup />
      </AppProvider>
    </CacheProvider>
  );
}

export default CustomApp;
