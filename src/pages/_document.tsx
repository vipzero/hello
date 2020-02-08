import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

type Props = {}

class Document extends NextDocument<Props> {
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
