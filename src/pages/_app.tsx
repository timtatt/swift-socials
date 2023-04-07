import 'react-toastify/dist/ReactToastify.min.css'
import '@/styles/globals.scss'
import type { AppProps as DefaultAppProps } from 'next/app'
import { Layout } from '@/common/components/Layout'
import pkg from '@/../package.json'

type AppProps = DefaultAppProps & {
	version: string
}

function App({ Component, pageProps, version }: AppProps) {
  return <>
		<Layout version={version}>
			<Component {...pageProps} />
		</Layout>
	</>
}

App.getInitialProps = async () => {
	return { version: pkg.version }
}

export default App;