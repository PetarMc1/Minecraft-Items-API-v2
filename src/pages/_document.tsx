import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="API for retrieving information for Minecraft items, blocks, effects, and other"/>
          <meta name="keywords" content="Minecraft items API, Minecraft API, minecraft blocks API, Petar_mc's API, Minecraft API"/>
          <meta name="author" content="Petar_mc"/>
          <meta property="og:title" content="Minecraft API"/>
          <meta property="og:description" content="API for retrieving information for Minecraft items, blocks, effects, and other"/>
          <meta property="og:image" content="https://api.petarmc.com/public/logo.png"/>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
