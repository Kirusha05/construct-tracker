import { useEffect } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/nprogress.css";

import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "../styles/theme";
import { PageWrapper } from "../components/UI";
import { wrapper } from "../store";
import { useRouter } from "next/router";
import Head from "next/head";
import NProgress from "nprogress";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });

    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());

    return () => {
      router.events.off("routeChangeStart", () => NProgress.start());
      router.events.off("routeChangeComplete", () => NProgress.done());
      router.events.off("routeChangeError", () => NProgress.done());
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="O aplicație pentru management-ul proiectelor imobiliare"
        />
        {/* <meta name="keywords" content="Keywords" /> */}
        <title>Construct Tracker</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icon-512.png"
          rel="icon"
          type="image/png"
          sizes="512x512"
        />
        <meta name="theme-color" content="#eceef0" />
      </Head>
      <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          <PageWrapper>
            <Component {...pageProps} />
          </PageWrapper>
      </ThemeProvider>
    </>
  );
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
