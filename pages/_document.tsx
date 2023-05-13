import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full bg-white">
      <Head>
        <title>Vitalize Care Dashboard</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
