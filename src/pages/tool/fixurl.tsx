// eslint-disable-next-line
import { Box, Card, Container, Typography } from '@mui/material'
import { range } from 'lodash'
import Head from 'next/head'
import { useRouter } from 'next/router'

const deleteChars = '●△○◎◯■□◆'
const ignoreRe = new RegExp(deleteChars, 'g')
const urlRe =
	/(https?:\/\/)?[-_a-zA-Z0-9]+([.][-_a-zA-Z0-9]+){1,}([\/][-_a-zA-Z0-9;\/?:\@&=+\$,%#]*)?/g
function parseUrl(s: string | string[] | undefined, shift = 0) {
	if (typeof s !== 'string') return null

	const lines = s.replace(ignoreRe, '').split('\n')
	range(shift).forEach(() => lines.shift())

	const texts = range(lines.length - 1).map((i) => lines[i] + lines[i + 1])
	console.log(texts)

	return texts
		.map((text) => {
			const m = text.matchAll(urlRe)
			return [...m].map((v) => v[0])
		})
		.flat()
		.map((v) => (v.startsWith('http') ? v : [`https://${v}`, `http://${v}`]))
		.flat()
}

function FixurlApp() {
	const { query } = useRouter()
	console.log(query)
	const urls = parseUrl(query.text)

	return (
		<Container>
			<Typography variant="h5">URL修正</Typography>
			<Typography>共有ボタンから使ってください{`(?q=text)`}</Typography>
			<Typography>詳細: 先頭2行消す, 改行と{deleteChars}を消す</Typography>

			<Box m={1} p={1} component={Card}>
				<Typography>元テキスト</Typography>
				{query.text}
			</Box>
			<Box m={1} p={1} component={Card}>
				<Typography>URL</Typography>
				{!urls && 'なし'}
				{urls?.map((url, i) => (
					<Typography key={i}>
						<a href={url}>{url}</a>
					</Typography>
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
