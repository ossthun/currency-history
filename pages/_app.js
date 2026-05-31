import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5958056334367225"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
