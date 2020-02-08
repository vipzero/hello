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
					<link rel="shortcut icon" href="/favicon.png" />
					<meta name="theme-color" content="#ffffff" />
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
