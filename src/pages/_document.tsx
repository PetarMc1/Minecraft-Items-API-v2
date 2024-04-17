import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="description" content="Minecraft v2 API for retrieving item and block information."></meta>
      <meta name="keywords" content="minecraft api, mc api, minecraft api v2, mc api v2, minecraft blocks api, minecraft items api, mc blocks api, mc items api"></meta>
      <title>Minecraft Items API v2</title>
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
