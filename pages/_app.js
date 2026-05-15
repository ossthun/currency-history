import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5958056334367225"
          crossOrigin="anonymous"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
