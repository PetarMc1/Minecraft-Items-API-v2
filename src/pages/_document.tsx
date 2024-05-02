import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
        <title>Minecraft API</title>
        <meta name="description" content="API for retrieving information for Minecraft items, blocks, effects, and other" />
        <meta name="keywords" content="Minecraft items api, Minecraft api, minecraft blocks API, Petar_mc's API, Minecraft API" />
        <meta name="author" content="Petar_mc" />
        {/* Open Graph meta tags */}
        <meta property="og:title" content="Minecraft API" />
        <meta property="og:description" content="API for retrieving information for Minecraft items, blocks, effects, and other" />
        <meta property="og:image" content="/public/favicon.ico" />
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
