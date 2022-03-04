import React from 'react'
import dynamic from 'next/dynamic'

import { AppProps } from 'next/app'
import Layout from '../../components/Layout'

const Uraru = ({ Component, pageProps }: AppProps) => {
	const SafeHydrate = dynamic(() => import('../../components/uraruPage'), {
		ssr: false,
	})

	return (
		<SafeHydrate>
			<Layout title="lru">
				<Component {...pageProps} />
			</Layout>
		</SafeHydrate>
	)
}

export default Uraru
