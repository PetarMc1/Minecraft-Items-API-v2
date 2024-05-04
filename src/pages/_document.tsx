import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="title" content="Minecraft Items API v2"/>
          <meta name="description" content="API for retrieving information for Minecraft items, blocks, effects, and other"/>
          <meta name="keywords" content="mcapi, Minecraftapi, Minecraft api, mcapi v2, Minecraft api v2, minecraftapi v2"/>
          <meta name="robots" content="index, follow"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta name="language" content="English"/>
          <meta name="author" content="Petar_mc"/>
          <meta property="og:url" content="https://api.petarmc.com"/>
          <meta property="og:type" content="website"/>
          <meta property="og:title" content="Minecraft Items API v2"/>
          <meta property="og:description" content="API for retrieving information for Minecraft items, blocks, effects, and other"/>
        	<meta property="og:image" content="https://github.com/PetarMc1/Minecraft-Items-API-v2/blob/ca285895dac643ffd4467d8619102685c33862f2/public/logo.png">
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
