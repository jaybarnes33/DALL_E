import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="og:description"
          content="Generate beautiful and unique images. Get unique wallpapers for everything"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
