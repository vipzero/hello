// eslint-disable-next-line
import { Box, Card, Container, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

const urlRegex =
	/(https?:\/\/)?[-_a-zA-Z0-9]+[.][-_a-zA-Z0-9]+([\/][-_a-zA-Z0-9;\/?:\@&=+\$,%#]*)?/g
function parseUrl(s: string | string[] | undefined) {
	if (typeof s !== 'string') return null

	const lines = s.replace(/●/g, '').split('\n')
	lines.pop()
	lines.pop()

	const m = lines.join('').matchAll(urlRegex)

	return [...m].map((v) => v[0])
}

function FixurlApp() {
	const { query } = useRouter()
	console.log(query)
	const urls = parseUrl(query.text)

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
				{!urls && 'なし'}
				{urls?.map((url, i) => (
					<a key={i} href={url}>
						{url}
					</a>
				))}
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
