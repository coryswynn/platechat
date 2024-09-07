import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { LocalDbProvider } from '../lib/localDb';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocalDbProvider>
      <Component {...pageProps} />
    </LocalDbProvider>
  );
}

export default MyApp;