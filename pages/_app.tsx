import type { AppProps } from 'next/app'
import '../styles/global.scss';

interface ENV {
  env: {
    URL: string;
    PHOTO_REFERENCE_URL: string
    API_KEY: string;
  };
};

function MyApp({ Component, pageProps, env }: AppProps & ENV) {
  return <Component env={env} {...pageProps} />
};

MyApp.getInitialProps = async () => {
  return {
    env: {
      URL: process.env.URL,
      API_KEY: process.env.API_KEY,
      PHOTO_REFERENCE_URL: process.env.PHOTO_REFERENCE_URL
    }
  };
};

export default MyApp
