// eslint-disable-next-line
import { Box, Card, Container, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

function parseUrl(s: string | string[] | undefined) {
	if (typeof s !== 'string') return null

	const lines = s.replace(/●/g, '').split('\n')
	lines.pop()
	lines.pop()

	const m = lines
		.join('')
		.match(/(https?:\/\/)?[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g)

	if (m === null) return null
	return m[0]
}

function FixurlApp() {
	const { query } = useRouter()
	console.log(query)
	const url = parseUrl(query.text)

	return (
		<Container>
			<Typography variant="h5">URL修正</Typography>
			<Typography>共有ボタンから使ってください{`(?q=text)`}</Typography>
			<Typography>詳細: 先頭2行消す, 改行と●を消す</Typography>

			<Box m={1} p={1} component={Card}>
				<Typography>元テキスト</Typography>
				{query.text}
			</Box>
			<Box m={1} p={1} component={Card}>
				<Typography>URL</Typography>
				{!url && 'なし'}
				{url && <a href={url}>{url}</a>}
			</Box>
		</Container>
	)
}

const title = 'fixurl'

function Fixurl() {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<link
					rel="shortcut icon"
					href="/fixurl-res/icon.png"
					key="shortcutIcon"
				/>
				<link rel="manifest" href="/fixurl-res/manifest.json" />
				<meta name="theme-color" content="#000" key="themeColor" />
				<meta property="og:title" content={title} />
			</Head>
			<FixurlApp />
		</div>
	)
}

export default Fixurl
