import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon_32.png" />
				<link rel="icon" type="image/png" sizes="128x128" href="/favicon_128.png" />
				<link rel="icon" type="image/png" sizes="180x180" href="/favicon_180.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/favicon_192.png" />
			</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
