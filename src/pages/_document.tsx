import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import React from 'react'

type Props = {}

class Document extends NextDocument<Props> {
	static async getInitialProps(ctx) {
		const sheet = new StyledComponentSheets()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await NextDocument.getInitialProps(ctx)

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}
	render() {
		return (
			<Html lang={'ja'}>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" />
					<meta name="theme-color" content="#000" key="themeColor" />
					<link rel="manifest" href="/manifest.json" />
					<link
						href="https://fonts.googleapis.com/css?family=Nova+Mono"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Major+Mono+Display"
						rel="stylesheet"
					/>
				</Head>

				<body>
					<Main />

					<NextScript />
				</body>
			</Html>
		)
	}
}

export default Document
